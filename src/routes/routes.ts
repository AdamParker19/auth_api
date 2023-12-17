import { Router } from "express";
import AuthController from "../controllers/authController";
import { verifyToken } from "../middlewares/auth_middlewares";
import ProductController from "../controllers/productsController";

const auth = new AuthController();
const productController: ProductController = new ProductController();

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
    middleware: verifyToken,
  },
];

export const createRoutes = () => {
  const router = Router();

  routes.forEach((route) => {
    if (route.middleware) {
      // If middleware is defined, apply it before the route handler
      router[route.method](route.path, route.middleware, route.handler);
    } else {
      router[route.method](route.path, route.handler);
    }
  });

  return router;
};
