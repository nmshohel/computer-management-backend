/*
  Warnings:

  - You are about to drop the column `status` on the `capital_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "capital_item" DROP COLUMN "status",
ADD COLUMN     "activeOrcondemnationStatus" TEXT NOT NULL DEFAULT 'r';
