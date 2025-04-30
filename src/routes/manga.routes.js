import { Router } from "express";
import { getAllManga, getMangaById, getMangaRecommendations, searchManga } from "../controller/manga.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
import {paidUser} from "../middleware/protectPaidUser.middleware.js"


const router = Router()
router.use(authMiddleware)
router.use(paidUser)
router.get("/",getAllManga)
router.get("/recommendations/:id",getMangaRecommendations)
router.get("/search",searchManga)
router.get("/:id",getMangaById)

export default router