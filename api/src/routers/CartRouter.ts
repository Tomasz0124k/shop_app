import { Router } from "express";
import type { Request, Response } from "express";
// import { cartController } from "controllers/user.controller";
import { CartController } from "./../controllers/CartController";
import { Middleware } from "../controllers/Middleware";

const router = Router();
const cartController = new CartController();
const middleware = new Middleware();

router.post('/', middleware.isAuthorize, cartController.get);
router.post('/update', middleware.isAuthorize, cartController.update);
router.post('/pay', middleware.isAuthorize, cartController.pay);
router.post('/products/update', middleware.isAuthorize, cartController.updateProduct);
router.post('/products/amount', middleware.isAuthorize, cartController.getProductsAmount);


export default router;











