import { defineConfig } from "prisma/config"
import * as fs from "fs"
import * as path from "path"

// Prisma 7 config loader explicitly sets dotenv: false, so .env is never loaded
// before this file runs. We read it manually so `prisma generate` works without
// pre-exporting env vars in the shell.
function readEnvFile(name: string): string | undefined {
  if (process.env[name]) return process.env[name]
  try {
    const content = fs.readFileSync(path.join(process.cwd(), ".env"), "utf-8")
    const match = content.match(new RegExp(`^${name}=(.*)$`, "m"))
    if (match) return match[1].trim().replace(/^["']|["']$/g, "")
  } catch {}
  return undefined
}

const dbUrl = readEnvFile("DATABASE_URL_UNPOOLED")

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  ...(dbUrl && { datasource: { url: dbUrl } }),
})
