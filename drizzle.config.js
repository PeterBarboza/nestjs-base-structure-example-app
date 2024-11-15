const { defineConfig } = require('drizzle-kit');
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  schema: './src/lib/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
