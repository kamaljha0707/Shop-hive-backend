import { Router } from "express";
import { fetchUserById, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/:userId").get(fetchUserById).patch(updateUser)


export default router