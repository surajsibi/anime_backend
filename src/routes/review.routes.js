import { Router } from "express";
import {getReviewsByAnime,postReview,updateReview,deleteReview} from "../controller/review.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"


const router = Router()

router.use(authMiddleware)
router.post("/:animeId",postReview)
router.get("/:animeId",getReviewsByAnime)
router.put("/:reviewId",updateReview)
router.delete("/:reviewId",deleteReview)


export default router