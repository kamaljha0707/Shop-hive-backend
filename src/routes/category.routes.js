import { Router } from "express";
import { fetchCategories } from "../controllers/category.controller.js";

const router = Router()

router.route("/").get(fetchCategories)


export default router