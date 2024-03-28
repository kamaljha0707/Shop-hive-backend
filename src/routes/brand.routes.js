import { Router } from "express";
import { fetchAllBrands } from "../controllers/brand.controller.js";

const router = Router()

router.route("/").get(fetchAllBrands)


export default router