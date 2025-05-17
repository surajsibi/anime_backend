import { AsyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Review } from "../models/review.model.js"
import { User } from "../models/user.model.js"
import axios from "axios"


export const postReview = AsyncHandler(async (req, res, next) => {
    const { comment, rating } = req.body
    const { animeId } = req.params


    const existing = await Review.findOne({
        user: req.user._id,
        animeId
    })

    if (existing) {
        throw new ApiError(400, "you have already reviewed this anime")
    }

    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`)
    const anime = response.data.data
    if(!anime)throw new ApiError(404,"can not find anime")
    const review = await Review.create({
        user: req.user._id,
        animeId:anime.mal_id,
        animeTitle:anime.title,
        comment,
        rating
    });

    if (!review) {
        throw new ApiError(404, 'unable t create review')
    }


    return res.status(200)
        .json(new ApiResponse(200, review, "review added"))
})


export const getReviewsByAnime = AsyncHandler(async (req, res, next) => {
    const { animeId } = req.params
    const reviews = await Review.find({ animeId })
        .populate("user", "name") // show user's name
        .sort({ createdAt: -1 });


    console.log(reviews)



    if (!reviews) {
        throw new ApiError(400, "unble to get review")
    }

    return res.status(200).json(new ApiResponse(200, reviews, "review got succesfull"))
})

export const updateReview = AsyncHandler(async (req, res, next) => {
    const { reviewId } = req.params
    const { comment, rating } = req.body
    const review = await Review.findById(reviewId)
    if (!review) {
        throw new ApiError(404, "review not found")
    }
    if (review.user.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "only user can do changes")
    }
    review.comment = comment || review.comment
    review.rating = rating || review.rating
    
    await review.save()
    
    return res.status(200).json(new ApiResponse(200, review, "updated review"))
})

export const deleteReview = AsyncHandler(async (req, res, next) => {
    const {reviewId} = req.params
    const review = await Review.findById(reviewId)
    if (review.user.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "only user can do changes")
    }
    if(!review){
        throw new ApiError(404,"review not found")
    }

    await Review.findByIdAndDelete(reviewId)

    return res.status(200)
    .json(new ApiResponse(200,{},"review deleted successfully"))

})


export const getMyReview = AsyncHandler(async(req,res,next)=>{
    const review = await Review.find({user:req.user._id}).sort({createdAt:-1})   
    return res.status(200).json(new ApiResponse(200,review,"my review"))
})

