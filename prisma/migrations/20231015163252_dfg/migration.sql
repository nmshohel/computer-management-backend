-- CreateEnum
CREATE TYPE "ItemCode" AS ENUM ('CPU', 'MNT', 'UPS', 'DVR');

-- CreateTable
CREATE TABLE "pbs" (
    "pbsCode" TEXT NOT NULL,
    "pbsName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pbs_pkey" PRIMARY KEY ("pbsCode")
);

-- CreateTable
CREATE TABLE "zonals" (
    "zonalCode" TEXT NOT NULL,
    "zonalName" TEXT NOT NULL,
    "pbsCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zonals_pkey" PRIMARY KEY ("zonalCode")
);

-- CreateTable
CREATE TABLE "substations" (
    "substationCode" TEXT NOT NULL,
    "substationName" TEXT NOT NULL,
    "pbsCode" TEXT NOT NULL,
    "zonalCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "substations_pkey" PRIMARY KEY ("substationCode")
);

-- CreateTable
CREATE TABLE "complain_center" (
    "complainCode" TEXT NOT NULL,
    "complainName" TEXT NOT NULL,
    "pbsCode" TEXT NOT NULL,
    "zonalCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complain_center_pkey" PRIMARY KEY ("complainCode")
);

-- CreateTable
CREATE TABLE "users" (
    "mobileNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "pbsTransferStatus" BOOLEAN DEFAULT false,
    "pbsTransferRequestBy" TEXT,
    "pbsTransferRequestedPbsCode" TEXT,
    "pbsTransferRequestDate" TIMESTAMP(3),
    "pbsTranferApprovedBy" TEXT,
    "pbsTranferApprovedDate" TIMESTAMP(3),
    "pbsTranferCancelBy" TEXT,
    "pbsTranferCancelDate" TIMESTAMP(3),
    "zonalTransferStatus" BOOLEAN DEFAULT false,
    "requestedZonalCode" TEXT,
    "zonalTransferRequestBy" TEXT,
    "zonalTransferRequestDate" TIMESTAMP(3),
    "zonalTranferApprovedBy" TEXT,
    "zonalTranferApprovedDate" TIMESTAMP(3),
    "zonalTranferCancelBy" TEXT,
    "zonalTranferCancelDate" TIMESTAMP(3),
    "pbsCode" TEXT NOT NULL,
    "zonalCode" TEXT,
    "substationCode" TEXT,
    "complainCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("mobileNo")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "designation" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "trgId" TEXT,
    "photoUrl" TEXT,
    "signUrl" TEXT,
    "mobileNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designations" (
    "id" TEXT NOT NULL,
    "designationName" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_type" (
    "id" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "itemTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_category" (
    "id" TEXT NOT NULL,
    "subCategoryName" TEXT NOT NULL,
    "itemCode" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capital_item" (
    "id" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "purchasedate" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "warranty" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "itemTypeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "subCategoryid" TEXT NOT NULL,
    "pbsCode" TEXT NOT NULL,
    "addByMobileNo" TEXT NOT NULL,
    "activeOrcondemnationStatus" TEXT NOT NULL DEFAULT 'a',
    "identificationNo" TEXT,
    "zonalCode" TEXT,
    "complainCode" TEXT,
    "substationCode" TEXT,
    "issueByMobileNo" TEXT,
    "assignToMobileNo" TEXT,
    "approveByMobileNo" TEXT,
    "receivedByMobileNo" TEXT,
    "certifiedByMobileNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capital_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue_item" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "purchasedate" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "warranty" TEXT,
    "serialNo" TEXT,
    "activeOrcondemnationStatus" TEXT DEFAULT 'a',
    "identificationNo" TEXT,
    "modelId" TEXT,
    "brandId" TEXT,
    "pbsCode" TEXT NOT NULL,
    "zonalCode" TEXT,
    "complainCode" TEXT,
    "substationCode" TEXT,
    "itemTypeId" TEXT,
    "categoryId" TEXT,
    "subCategoryid" TEXT,
    "issueByMobileNo" TEXT,
    "assignToMobileNo" TEXT,
    "approveByMobleNo" TEXT,
    "receivedByMobileNo" TEXT,
    "addByMobileNo" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "certifiedByMobileNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenue_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pbsCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "employees_mobileNo_key" ON "employees"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "departments_departmentName_key" ON "departments"("departmentName");

-- CreateIndex
CREATE UNIQUE INDEX "designations_designationName_key" ON "designations"("designationName");

-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "sub_category_subCategoryName_key" ON "sub_category"("subCategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "brands_brandName_key" ON "brands"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "models_modelName_key" ON "models"("modelName");

-- CreateIndex
CREATE UNIQUE INDEX "capital_item_identificationNo_key" ON "capital_item"("identificationNo");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_name_key" ON "suppliers"("name");

-- AddForeignKey
ALTER TABLE "zonals" ADD CONSTRAINT "zonals_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substations" ADD CONSTRAINT "substations_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substations" ADD CONSTRAINT "substations_zonalCode_fkey" FOREIGN KEY ("zonalCode") REFERENCES "zonals"("zonalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complain_center" ADD CONSTRAINT "complain_center_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complain_center" ADD CONSTRAINT "complain_center_zonalCode_fkey" FOREIGN KEY ("zonalCode") REFERENCES "zonals"("zonalCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_pbsTransferRequestBy_fkey" FOREIGN KEY ("pbsTransferRequestBy") REFERENCES "employees"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_pbsTransferRequestedPbsCode_fkey" FOREIGN KEY ("pbsTransferRequestedPbsCode") REFERENCES "pbs"("pbsCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_requestedZonalCode_fkey" FOREIGN KEY ("requestedZonalCode") REFERENCES "zonals"("zonalCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_zonalTransferRequestBy_fkey" FOREIGN KEY ("zonalTransferRequestBy") REFERENCES "employees"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_zonalCode_fkey" FOREIGN KEY ("zonalCode") REFERENCES "zonals"("zonalCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_substationCode_fkey" FOREIGN KEY ("substationCode") REFERENCES "substations"("substationCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_complainCode_fkey" FOREIGN KEY ("complainCode") REFERENCES "complain_center"("complainCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_mobileNo_fkey" FOREIGN KEY ("mobileNo") REFERENCES "users"("mobileNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designations" ADD CONSTRAINT "designations_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_subCategoryid_fkey" FOREIGN KEY ("subCategoryid") REFERENCES "sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_addByMobileNo_fkey" FOREIGN KEY ("addByMobileNo") REFERENCES "users"("mobileNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_zonalCode_fkey" FOREIGN KEY ("zonalCode") REFERENCES "zonals"("zonalCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_complainCode_fkey" FOREIGN KEY ("complainCode") REFERENCES "complain_center"("complainCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_substationCode_fkey" FOREIGN KEY ("substationCode") REFERENCES "substations"("substationCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_issueByMobileNo_fkey" FOREIGN KEY ("issueByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_assignToMobileNo_fkey" FOREIGN KEY ("assignToMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_approveByMobileNo_fkey" FOREIGN KEY ("approveByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_receivedByMobileNo_fkey" FOREIGN KEY ("receivedByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capital_item" ADD CONSTRAINT "capital_item_certifiedByMobileNo_fkey" FOREIGN KEY ("certifiedByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_identificationNo_fkey" FOREIGN KEY ("identificationNo") REFERENCES "capital_item"("identificationNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_zonalCode_fkey" FOREIGN KEY ("zonalCode") REFERENCES "zonals"("zonalCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_complainCode_fkey" FOREIGN KEY ("complainCode") REFERENCES "complain_center"("complainCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_substationCode_fkey" FOREIGN KEY ("substationCode") REFERENCES "substations"("substationCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_subCategoryid_fkey" FOREIGN KEY ("subCategoryid") REFERENCES "sub_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_issueByMobileNo_fkey" FOREIGN KEY ("issueByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_assignToMobileNo_fkey" FOREIGN KEY ("assignToMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_approveByMobleNo_fkey" FOREIGN KEY ("approveByMobleNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_receivedByMobileNo_fkey" FOREIGN KEY ("receivedByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_addByMobileNo_fkey" FOREIGN KEY ("addByMobileNo") REFERENCES "users"("mobileNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenue_item" ADD CONSTRAINT "revenue_item_certifiedByMobileNo_fkey" FOREIGN KEY ("certifiedByMobileNo") REFERENCES "users"("mobileNo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_pbsCode_fkey" FOREIGN KEY ("pbsCode") REFERENCES "pbs"("pbsCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_serviceByMobileNo_fkey" FOREIGN KEY ("serviceByMobileNo") REFERENCES "users"("mobileNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_identificationNo_fkey" FOREIGN KEY ("identificationNo") REFERENCES "capital_item"("identificationNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicings" ADD CONSTRAINT "servicings_suplierId_fkey" FOREIGN KEY ("suplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
