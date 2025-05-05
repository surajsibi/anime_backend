import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import {Review} from "../models/review.model.js"

export const getAllUser = AsyncHandler(async(req , res , next)=>{
    const users = await User.find().select("-password")
    if(!users){
        throw new ApiError(402,"unable to find users")
    }
    return res.status(200).json(new ApiResponse(200,users,"all users fetched    "))
})


export const updateUser = AsyncHandler(async(req,res,next)=>{
    const {userId} = req.params
    const {role,subscription}= req.body

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(402,"user not found")
    }
    if(role) user.role = role || user.role
    if(subscription) user.subscription = subscription || user.subscription
    await user.save()
    return res.status(200).json(new ApiResponse(200,user,"user updated successfully"))
})


export const deleteUser = AsyncHandler(async(req,res,next)=>{
    const {userId} =req.params
    const user = await User.findById(userId)
    if(!user)throw new ApiError(404,"user not found")
        await user.deleteOne()
    return res.status(200).json(new ApiResponse(200,"user deleted successfully"))
})

export const getAllReview  = AsyncHandler(async(req,res,next)=>{
    const reviews = await Review.find().populate("user","name email")
    if(reviews.length ===0) return res.status(200).json(new ApiResponse(200,"no reviews "))
    return res.status(200).json(new ApiResponse(200,reviews,"all review fetched successfully"))
})

export const deleteReview = AsyncHandler(async(req,res,next)=>{
    const {reviewId} = req.params
    const review = await Review.findById(reviewId)
    if(!review)throw new ApiError(402,"review not found")
    await review.deleteOne()

    return res.status(200).json(new ApiResponse(200,"review deleted successfully"))

})