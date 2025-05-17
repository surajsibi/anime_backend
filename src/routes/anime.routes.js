import { Router } from "express";
import {getAllAnime, getAnimeById, getAnimeCharacters, getAnimeRecommendations, getAnimeReview, getAnimeStaff, getSeasonalAnime, getTopAnime, getTrendingAnime, personDetails} from "../controller/animeController.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
import { searchAnime } from "../controller/search.controller.js";
const router = Router()
router.use(authMiddleware)
router.get("/",getAllAnime)
router.get("/top",getTopAnime)
router.get("/seasonal",getSeasonalAnime)
router.get("/trending",getTrendingAnime)
router.get("/recommendations/:id",getAnimeRecommendations)
router.get("/reviews/:id",getAnimeReview)
router.get("/characters/:id",getAnimeCharacters)
router.get("/staff/:id",getAnimeStaff)
router.get("people/:id",personDetails)
router.get("/search",searchAnime)
router.get("/:id",getAnimeById)

export default router