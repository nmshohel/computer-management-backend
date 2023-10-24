-- AlterTable
ALTER TABLE "servicings" ADD COLUMN     "pbsCode" TEXT;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE SET NULL ON UPDATE CASCADE;
