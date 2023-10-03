/*
  Warnings:

  - You are about to drop the column `status` on the `revenue_item` table. All the data in the column will be lost.
  - Made the column `supplierId` on table `revenue_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "revenue_item" DROP CONSTRAINT "revenue_item_supplierId_fkey";

-- AlterTable
ALTER TABLE "revenue_item" DROP COLUMN "status",
ADD COLUMN     "activeOrcondemnationStatus" TEXT DEFAULT 'a',
ALTER COLUMN "supplierId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
