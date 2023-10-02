/*
  Warnings:

  - Made the column `itemTypeId` on table `capital_item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `capital_item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subCategoryid` on table `capital_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "capital_item" DROP CONSTRAINT "capital_item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "capital_item" DROP CONSTRAINT "capital_item_itemTypeId_fkey";

-- DropForeignKey
ALTER TABLE "capital_item" DROP CONSTRAINT "capital_item_subCategoryid_fkey";

-- AlterTable
ALTER TABLE "capital_item" ALTER COLUMN "itemTypeId" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "subCategoryid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_subCategoryid_fkey" FOREIGN KEY ("subCategoryid") REFERENCES "sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
