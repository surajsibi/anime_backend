import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express ()

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


// import routes 

import userRouter from "./routes/auth.routes.js"
import animeRouter from "./routes/anime.routes.js"
import mangaRouter from "./routes/manga.routes.js"
import profileRouter from "./routes/user.routes.js"
import reviewRouter from "./routes/review.routes.js"
import bookmarkRouter from "./routes/bookmark.routes.js"
import adminRouter from "./routes/admin.routes.js"


// declaration 

app.use("/api/v1/user",userRouter)
app.use("/api/v1/anime",animeRouter)
app.use("/api/v1/manga",mangaRouter)
app.use("/api/v1/profile",profileRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/bookmark",bookmarkRouter)
app.use("/api/v1/admin",adminRouter)



export {app}