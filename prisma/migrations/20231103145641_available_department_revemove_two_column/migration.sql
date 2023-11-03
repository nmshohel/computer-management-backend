/*
  Warnings:

  - You are about to drop the column `laserPrinterLightDutyNos` on the `AvailableDepartment` table. All the data in the column will be lost.
  - You are about to drop the column `laserPrinterType1Nos` on the `AvailableDepartment` table. All the data in the column will be lost.
  - You are about to drop the column `laserPrinterType2Nos` on the `AvailableDepartment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvailableDepartment" DROP COLUMN "laserPrinterLightDutyNos",
DROP COLUMN "laserPrinterType1Nos",
DROP COLUMN "laserPrinterType2Nos",
ADD COLUMN     "laserPrinterNos" TEXT;
