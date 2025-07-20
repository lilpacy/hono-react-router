import type { Config } from 'drizzle-kit'

export default {
  out: './database/drizzle',
  schema: './database/schema/index.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: '67167978-02ea-430f-9a90-0d5a59c95e55',
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    token: process.env.CLOUDFLARE_TOKEN!,
  },
} satisfies Config
