# Design Document

## Overview

This design outlines the migration strategy from pnpm to bun for the hono-react-router project. The migration involves replacing pnpm as the package manager while maintaining all existing functionality, scripts, and development workflows. The project currently uses pnpm with engine-strict configuration and needs to be converted to use bun's package management and workspace capabilities.

## Architecture

### Current State Analysis

- **Package Manager**: pnpm with engine-strict enabled
- **Lock File**: pnpm-lock.yaml (7947 lines)
- **Configuration**: .npmrc with engine-strict=true
- **Scripts**: Multiple npm scripts using pnpm for linting
- **Dependencies**: 13 production dependencies, 31 development dependencies
- **Project Type**: Single package (not a workspace currently)

### Target State

- **Package Manager**: bun
- **Lock File**: bun.lockb (binary format)
- **Configuration**: Remove .npmrc, add bun-specific configs if needed
- **Scripts**: Convert pnpm-specific scripts to bun equivalents
- **Dependencies**: Same versions maintained
- **Project Type**: Single package with bun package management

## Components and Interfaces

### Package Management Migration

- **Lock File Conversion**: Remove pnpm-lock.yaml, generate bun.lockb
- **Dependency Resolution**: Ensure all dependencies resolve correctly with bun
- **Version Consistency**: Maintain exact same dependency versions during migration

### Script Migration

- **Lint Script Update**: Change `"lint": "pnpm /^lint:.*/"` to bun equivalent
- **Script Execution**: Ensure all other scripts work with `bun run` instead of `pnpm run`
- **Command Compatibility**: Verify bun can execute all existing scripts

### Configuration Migration

- **Engine Restrictions**: Remove pnpm engine requirement from package.json
- **NPM Configuration**: Remove or convert .npmrc settings
- **Bun Configuration**: Add bunfig.toml if specific configurations are needed

### Development Workflow

- **Installation**: `bun install` instead of `pnpm install`
- **Script Execution**: `bun run <script>` instead of `pnpm run <script>`
- **Dependency Management**: `bun add/remove` instead of `pnpm add/remove`

## Data Models

### Package.json Changes

```json
{
  "engines": {
    "node": ">=22.0.0"
    // Remove "pnpm": ">=9"
  },
  "scripts": {
    "lint": "bun run --filter '/^lint:.*/' ." // Updated lint script
    // All other scripts remain the same
  }
}
```

### Configuration Files

- **Remove**: pnpm-lock.yaml, potentially .npmrc
- **Add**: bun.lockb (generated automatically)
- **Optional**: bunfig.toml for bun-specific configuration

## Error Handling

### Migration Failure Scenarios

1. **Dependency Resolution Conflicts**
   - Backup original lock file before migration
   - Provide rollback instructions
   - Document any version conflicts that need manual resolution

2. **Script Execution Failures**
   - Test all scripts after migration
   - Provide fallback commands for any failing scripts
   - Document any bun-specific script syntax differences

3. **Build Process Issues**
   - Verify build, test, and dev commands work correctly
   - Test Cloudflare Workers deployment process
   - Ensure all tooling (Drizzle, Wrangler, etc.) works with bun

### Rollback Strategy

- Keep backup of pnpm-lock.yaml
- Revert package.json changes
- Restore .npmrc if modified
- Clear node_modules and reinstall with pnpm

## Testing Strategy

### Pre-Migration Testing

1. Document current functionality
2. Run all existing scripts and verify they work
3. Test build and deployment process
4. Record dependency tree and versions

### Post-Migration Testing

1. **Installation Test**: `bun install` completes successfully
2. **Script Tests**: All package.json scripts execute correctly
3. **Build Test**: `bun run build` produces identical output
4. **Development Test**: `bun run dev` starts development server
5. **Test Suite**: `bun run test` executes all tests
6. **Deployment Test**: `bun run deploy` works with Wrangler

### Validation Criteria

- All dependencies installed with same versions
- All scripts execute without errors
- Build output is identical
- Development server starts correctly
- Tests pass
- Deployment process works

### Performance Validation

- Compare installation speed (bun should be faster)
- Compare script execution speed
- Verify no regression in build times
- Check memory usage during development

## Implementation Considerations

### Bun Compatibility

- Verify all dependencies are compatible with bun
- Check for any pnpm-specific features being used
- Ensure Node.js compatibility (project requires >=22.0.0)

### Workspace Preparation

- Current project is single package, but design should support future workspace conversion
- Consider bun workspace configuration for potential monorepo expansion

### CI/CD Impact

- Update any CI/CD scripts that reference pnpm
- Ensure deployment pipelines work with bun
- Update documentation and README files

### Development Team Impact

- Provide migration guide for team members
- Document new commands (bun instead of pnpm)
- Ensure consistent development environment setup
