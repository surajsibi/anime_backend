import {AsyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import {Review} from "../models/review.model.js"


export const postReview = AsyncHandler(async(req ,res ,next)=>{
    const {comment,rating,animeTitle} =req.body
    const {animeId}=req.params


    const existing = await Review.findOne({
        user:req.user._id,
        animeId
    })

    if(existing){
        throw new ApiError(400,"you have already reviewed this anime")
    }

    const review = await Review.create({
        user: req.user._id,
        animeId,
        animeTitle,
        comment,
        rating
    });

    if(!review){
        throw new ApiError(404,'unable t create review')
    }


    return res.status(200)
    .json(new ApiResponse(200,review,"review added"))
})


export const getReviewsByAnime = AsyncHandler(async(req,res,next)=>{
    const {animeId} = req.params
    const reviews = await Review.find({ animeId })
    .populate("user", "name") // show user's name
    .sort({ createdAt: -1 });
    
    
    console.log(reviews)



        if(!reviews){
            throw new ApiError(400,"unble to get review")
        }
    
    return res.status(200).json(new ApiResponse(200,reviews,"review got succesfullt"))
})