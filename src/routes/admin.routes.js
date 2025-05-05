import { Router } from "express";
import {authMiddleware} from "../middleware/auth.middleware.js"
import {adminMiddleware} from "../middleware/admin.middleware.js"
import {getAllUser,deleteReview,deleteUser,getAllReview,updateUser} from "../controller/admin.controller.js"

const router = Router()
router.use(authMiddleware)
router.use(adminMiddleware)
router.get("/users",getAllUser)
router.put("/user/:userId",updateUser)
router.delete("/user/:userId",deleteUser)


router.get("/reviews",getAllReview)
router.delete("/review/:reviewId",deleteReview)


export default router