import { Router } from "express";
import { addToCart, deleteFromCart, fetchCartByUserId, updateCart } from "../controllers/cart.controller.js";

const router = Router()

router.route("/").post(addToCart).get(fetchCartByUserId)
router.route("/:cartId").delete(deleteFromCart).patch(updateCart)


export default router