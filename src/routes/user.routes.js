import { Router } from "express";
import {authMiddleware} from "../middleware/auth.middleware.js"

import {getUserProfile} from "../controller/userProfile.controller.js"


const router = Router()

router.use(authMiddleware)

router.get("/",getUserProfile)

export default router