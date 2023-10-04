/*
  Warnings:

  - You are about to drop the `survicings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "survicings" DROP CONSTRAINT "survicings_identificationNo_fkey";

-- DropForeignKey
ALTER TABLE "survicings" DROP CONSTRAINT "survicings_revenueItemId_fkey";

-- DropForeignKey
ALTER TABLE "survicings" DROP CONSTRAINT "survicings_serviceByMobileNo_fkey";

-- DropForeignKey
ALTER TABLE "survicings" DROP CONSTRAINT "survicings_suplierId_fkey";

-- DropTable
DROP TABLE "survicings";

-- CreateTable
CREATE TABLE "servicings" (
    "id" TEXT NOT NULL,
    "servicingCost" TEXT NOT NULL,
    "servicingDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "serviceByMobileNo" TEXT NOT NULL,
    "identificationNo" TEXT NOT NULL,
    "suplierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_serviceByMobileNo_fkey" FOREIGN KEY ("serviceByMobileNo") REFERENCES "users"("mobileNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_identificationNo_fkey" FOREIGN KEY ("identificationNo") REFERENCES "capital_item"("identificationNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_suplierId_fkey" FOREIGN KEY ("suplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
