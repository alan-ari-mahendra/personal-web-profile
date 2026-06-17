-- Rename emoji to icon on Tool table
ALTER TABLE "Tool" ADD COLUMN "icon" TEXT NOT NULL DEFAULT '';
UPDATE "Tool" SET "icon" = "emoji";
ALTER TABLE "Tool" DROP COLUMN "emoji";
ALTER TABLE "Tool" ALTER COLUMN "icon" DROP DEFAULT;
