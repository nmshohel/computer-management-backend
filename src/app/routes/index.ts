import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AvailableDepartmentRoutes } from '../modules/availableDepartment/availableDepartment.route';
import { AvailableDesignationRoutes } from '../modules/availableDesignation/availableDesignation.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { CapitalItemRoutes } from '../modules/capitalitem/capitalitem.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ComplainRoutes } from '../modules/complain/complain.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { DesignationRoutes } from '../modules/designation/designation.route';
import { EmployeeRoutes } from '../modules/employee/employee.route';
import { ItemTypeRoutes } from '../modules/itemtype/item.type.route';
import { ModelRoutes } from '../modules/model/model.route';
import { PbsRoutes } from '../modules/pbs/pbs.routes';
import { RevenueRoutes } from '../modules/revenueitem/revenueitem.route';
import { ServicingRoutes } from '../modules/servicing/servicing.route';
import { SubCategoryRoutes } from '../modules/subcatagory/subcategory.route';
import { SubstationRoutes } from '../modules/substation/substation.route';
import { SupplierRoutes } from '../modules/supplier/supplier.route';
import { UserRoutes } from '../modules/user/user.route';
import { ZonalRoutes } from '../modules/zonal/zonal.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/pbs',
    route: PbsRoutes,
  },
  {
    path: '/zonal',
    route: ZonalRoutes,
  },
  {
    path: '/complain',
    route: ComplainRoutes,
  },
  {
    path: '/substation',
    route: SubstationRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/model',
    route: ModelRoutes,
  },
  {
    path: '/item-type',
    route: ItemTypeRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/sub-category',
    route: SubCategoryRoutes,
  },
  {
    path: '/supplier',
    route: SupplierRoutes,
  },
  {
    path: '/capital-item',
    route: CapitalItemRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/designation',
    route: DesignationRoutes,
  },
  {
    path: '/capital-item',
    route: CapitalItemRoutes,
  },
  {
    path: '/revenue-item',
    route: RevenueRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/servicing',
    route: ServicingRoutes,
  },
  {
    path: '/available-department',
    route: AvailableDepartmentRoutes,
  },
  {
    path: '/available-designation',
    route: AvailableDesignationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
