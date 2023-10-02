/*
  Warnings:

  - Made the column `modelId` on table `capital_item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brandId` on table `capital_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "capital_item" DROP CONSTRAINT "capital_item_brandId_fkey";

-- DropForeignKey
ALTER TABLE "capital_item" DROP CONSTRAINT "capital_item_modelId_fkey";

-- AlterTable
ALTER TABLE "capital_item" ALTER COLUMN "modelId" SET NOT NULL,
ALTER COLUMN "brandId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
