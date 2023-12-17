"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const auth_middlewares_1 = require("../middlewares/auth_middlewares");
const productsController_1 = __importDefault(require("../controllers/productsController"));
const auth = new authController_1.default();
const productController = new productsController_1.default();
const routes = [
    {
        path: "/signup",
        method: "post",
        handler: auth.signUp
    },
    {
        path: "/login",
        method: "post",
        handler: auth.signIn
    },
    {
        path: "/logout",
        method: "get",
        handler: auth.signOut
    },
    {
        path: "/products/list",
        method: "get",
        handler: productController.list,
        middleware: auth_middlewares_1.verifyToken,
    },
];
const createRoutes = () => {
    const router = (0, express_1.Router)();
    routes.forEach((route) => {
        if (route.middleware) {
            // If middleware is defined, apply it before the route handler
            router[route.method](route.path, route.middleware, route.handler);
        }
        else {
            router[route.method](route.path, route.handler);
        }
    });
    return router;
};
exports.createRoutes = createRoutes;
