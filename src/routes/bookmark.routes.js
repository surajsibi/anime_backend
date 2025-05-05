import { Router } from "express";
import {authMiddleware} from "../middleware/auth.middleware.js"
import {addBookmark,getAllBookmark,getUserRecommandation,removeBookmark} from "../controller/bookmark.controller.js"

const router = Router()

router.use(authMiddleware)
router.get("/recommendations",getUserRecommandation)
router.post("/:animeId",addBookmark)
router.get("/",getAllBookmark)
router.delete("/:animeId",removeBookmark)

export default router
