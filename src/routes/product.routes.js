import { Router } from "express";
import { createProduct, fetchAllProducts, fetchProductById, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/products").post(createProduct).get(fetchAllProducts)
router.route("/products/:productId").get(fetchProductById).patch(updateProduct)


export default router

