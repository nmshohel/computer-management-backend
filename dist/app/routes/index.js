"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const brand_route_1 = require("../modules/brand/brand.route");
const capitalitem_route_1 = require("../modules/capitalitem/capitalitem.route");
const category_route_1 = require("../modules/category/category.route");
const complain_route_1 = require("../modules/complain/complain.route");
const department_route_1 = require("../modules/department/department.route");
const designation_route_1 = require("../modules/designation/designation.route");
const employee_route_1 = require("../modules/employee/employee.route");
const item_type_route_1 = require("../modules/itemtype/item.type.route");
const model_route_1 = require("../modules/model/model.route");
const pbs_routes_1 = require("../modules/pbs/pbs.routes");
const revenueitem_route_1 = require("../modules/revenueitem/revenueitem.route");
const servicing_route_1 = require("../modules/servicing/servicing.route");
const subcategory_route_1 = require("../modules/subcatagory/subcategory.route");
const substation_route_1 = require("../modules/substation/substation.route");
const supplier_route_1 = require("../modules/supplier/supplier.route");
const user_route_1 = require("../modules/user/user.route");
const zonal_route_1 = require("../modules/zonal/zonal.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/pbs',
        route: pbs_routes_1.PbsRoutes,
    },
    {
        path: '/zonal',
        route: zonal_route_1.ZonalRoutes,
    },
    {
        path: '/complain',
        route: complain_route_1.ComplainRoutes,
    },
    {
        path: '/substation',
        route: substation_route_1.SubstationRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/employee',
        route: employee_route_1.EmployeeRoutes,
    },
    {
        path: '/brand',
        route: brand_route_1.BrandRoutes,
    },
    {
        path: '/model',
        route: model_route_1.ModelRoutes,
    },
    {
        path: '/item-type',
        route: item_type_route_1.ItemTypeRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/sub-category',
        route: subcategory_route_1.SubCategoryRoutes,
    },
    {
        path: '/supplier',
        route: supplier_route_1.SupplierRoutes,
    },
    {
        path: '/capital-item',
        route: capitalitem_route_1.CapitalItemRoutes,
    },
    {
        path: '/department',
        route: department_route_1.DepartmentRoutes,
    },
    {
        path: '/designation',
        route: designation_route_1.DesignationRoutes,
    },
    {
        path: '/capital-item',
        route: capitalitem_route_1.CapitalItemRoutes,
    },
    {
        path: '/revenue-item',
        route: revenueitem_route_1.RevenueRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/servicing',
        route: servicing_route_1.ServicingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
