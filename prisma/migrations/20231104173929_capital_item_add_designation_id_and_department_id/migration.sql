-- AlterTable
ALTER TABLE "capital_item" ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "designationId" TEXT;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "designations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
