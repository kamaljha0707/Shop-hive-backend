import { Router } from "express";
import { fetchUserById, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/own")
.get(verifyJWT, fetchUserById)
router.route("/:id").patch( updateUser)


export default router