-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_requestedZonalCode_fkey" FOREIGN KEY ("requestedZonalCode") REFERENCES "zonals"("zonalCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_zonalTransferRequestBy_fkey" FOREIGN KEY ("zonalTransferRequestBy") REFERENCES "employees"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;
