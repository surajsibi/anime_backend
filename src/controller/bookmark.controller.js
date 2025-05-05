import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Bookmark } from "../models/bookmark.model.js"
import axios from "axios";





export const addBookmark = AsyncHandler(async (req, res, next) => {
    const { animeId } = req.params
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`)
        const anime = response.data.data
        const bookmarks = await Bookmark.find({userId:req.user._id})
        const alreadyBookmark = bookmarks.find(b=>b.mal_id === anime.mal_id)
        if(alreadyBookmark){
            return res.status(200)
            .json(new ApiResponse(200,{},"Already Bookmark"))
        }
        const  bookmark = {
            mal_id: anime.mal_id,
            title: anime.title,
            image: anime.images.jpg.image_url,
            url: anime.url,
            userId:req.user._id
        }
        const pushBookmark = await Bookmark.create(bookmark)
        return res.status(200)
        .json(new ApiResponse(200,pushBookmark,"bookmark added successfully"))

    }
    catch(error){
        throw new ApiError(404,`can not add bookmark ${error}`)
    }
})



export const getAllBookmark = AsyncHandler(async(req,res,next)=>{
    const bookmark = await Bookmark.find({userId:req.user._id})
    console.log(bookmark)
    if(!bookmark || bookmark.length === 0){
        return res.status(200).json(new ApiResponse(210,{},"No Bookmark found"))
    }
    return res.status(200).json(new ApiResponse(200,bookmark
        ,"bookmarks fetched successfully"
    ))
    
})







export const getUserRecommandation = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const userBookmark = await Bookmark.find({ userId: req.user._id })

    if (!user || !userBookmark || !userBookmark.length === 0) {
        throw new ApiError(404, "No Bookmarks")
    }
    const recommendationsMap = new Map()

    for (const anime of userBookmark) {
        const { mal_id } = anime
        try {
            const recRes = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/recommendations`);
            console.log(recRes)
            const recs = recRes.data.data
            for (const rec of recs) {
                const key = rec.entry.mal_id;
                if (!recommendationsMap.has(key)) {
                    recommendationsMap.set(key, {
                        mal_id: key,
                        title: rec.entry.title,
                        image: rec.entry.images.jpg.image_url,
                        url: rec.entry.url,
                        score: rec.vote_count || 0
                    });
                } else {
                    recommendationsMap.get(key).score += rec.vote_count || 0;
                }
            }
        } catch (error) {
            throw new ApiError(400, `${error}`)
        }
    }


    const sorted = Array.from(recommendationsMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
        if(sorted.length === 0){
            res.status(202).json(new ApiResponse(202,{},"no recommendation"))
        }

    res.status(200).json(new ApiResponse(200, sorted, "Recommended anime list"));

})

export const removeBookmark = AsyncHandler(async(req,res,next)=>{
    const {animeId} = req.params
    const user = await Bookmark.find({userId:req.user._id})
    
    console.log(user);
    const bookmark = user.find((item)=>(item.mal_id == animeId))
    
    await Bookmark.deleteOne(bookmark._id)
    return res.status(200)
    .json(new ApiResponse(200,{},"bookmark deleted successfully"))

})

