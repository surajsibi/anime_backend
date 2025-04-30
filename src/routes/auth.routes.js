import { Router } from "express";
import { loginUser, resiterUser, upgrade } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
 
const router = Router()

router.post("/register",resiterUser)
router.post("/login",loginUser)
router.get("/upgrade",authMiddleware,upgrade)

export default router