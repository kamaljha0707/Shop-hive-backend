import { Router } from "express";
import { addToCart, fetchCartByUserId } from "../controllers/cart.controller.js";

const router = Router()

router.route("/").post(addToCart).get(fetchCartByUserId)
// router.route("/:cartId").delete(deleteFromCart).patch(updateCart)


export default router