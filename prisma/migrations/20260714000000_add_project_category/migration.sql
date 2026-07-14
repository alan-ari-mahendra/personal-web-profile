-- Additive, non-destructive: adds a new array column with an empty-array
-- default. Existing rows are unaffected; no data is deleted or modified.
ALTER TABLE "Project" ADD COLUMN "category" TEXT[] NOT NULL DEFAULT '{}';
