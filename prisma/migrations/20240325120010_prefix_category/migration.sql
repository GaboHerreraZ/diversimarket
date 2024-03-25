-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "prefix" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "link" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Subcategory" ADD COLUMN     "prefix" TEXT NOT NULL DEFAULT '';
