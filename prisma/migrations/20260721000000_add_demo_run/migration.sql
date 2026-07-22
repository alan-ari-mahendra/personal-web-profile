-- CreateEnum
CREATE TYPE "DemoRunStatus" AS ENUM ('running', 'success', 'empty', 'error');

-- CreateTable
CREATE TABLE "DemoRun" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "status" "DemoRunStatus" NOT NULL DEFAULT 'running',
    "input" JSONB NOT NULL,
    "result" JSONB,
    "reason" TEXT,
    "callbackToken" TEXT,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemoRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DemoRun_slug_ip_createdAt_idx" ON "DemoRun"("slug", "ip", "createdAt");

-- CreateIndex
CREATE INDEX "DemoRun_createdAt_idx" ON "DemoRun"("createdAt");
