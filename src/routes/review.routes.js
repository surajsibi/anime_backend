import { Router } from "express";
import {getReviewsByAnime,postReview} from "../controller/review.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"


const router = Router()

router.use(authMiddleware)
router.post("/:animeId",postReview)
router.get("/:animeId",getReviewsByAnime)


export default router