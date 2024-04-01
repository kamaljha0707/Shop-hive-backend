import { Router } from "express";
import { createOrder, fetchOrderByUser, updateOrder, deleteOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/").post(createOrder).get(fetchOrderByUser)
router.route("/:orderId").delete(deleteOrder).patch(updateOrder)


export default router