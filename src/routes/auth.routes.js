import { Router } from "express";
import { checkAuth, createUser, loginUser, logoutUser, refreshAccessToken, resetPassword, resetPasswordRequest } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/signup").post(createUser)
router.route('/login').post( loginUser);

// secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/check').get(verifyJWT, checkAuth);
router.route('/reset-password-request/').post(resetPasswordRequest);
router.route('/reset-password/').post(resetPassword);





export default router