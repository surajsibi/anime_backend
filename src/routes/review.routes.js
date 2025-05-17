import { Router } from "express";
import {getReviewsByAnime,postReview,updateReview,deleteReview, getMyReview} from "../controller/review.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"


const router = Router()

router.use(authMiddleware)
router.post("/:animeId",postReview)
router.get("/my",getMyReview)
router.get("/:animeId",getReviewsByAnime)
router.put("/:reviewId",updateReview)
router.delete("/:reviewId",deleteReview)


export default router