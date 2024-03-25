/*
  Warnings:

  - You are about to drop the column `englishDescription` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `spanishDescription` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `englishDescription` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `spanishDescription` on the `Subcategory` table. All the data in the column will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "englishDescription",
DROP COLUMN "spanishDescription",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Subcategory" DROP COLUMN "englishDescription",
DROP COLUMN "spanishDescription",
ADD COLUMN     "description" TEXT NOT NULL;
