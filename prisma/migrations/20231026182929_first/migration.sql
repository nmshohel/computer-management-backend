/*
  Warnings:

  - Made the column `pbsCode` on table `servicings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "servicings" DROP CONSTRAINT "servicings_pbsCode_fkey";

-- AlterTable
ALTER TABLE "servicings" ALTER COLUMN "pbsCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;
