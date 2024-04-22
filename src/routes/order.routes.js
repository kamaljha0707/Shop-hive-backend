import { Router } from "express";
import { createOrder, fetchOrderByUser, updateOrder, deleteOrder, fetchAllOrders } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/").post(createOrder).get(fetchAllOrders)
router.route("/own").get(fetchOrderByUser)
router.route("/:orderId").delete(deleteOrder).patch(updateOrder)


export default router