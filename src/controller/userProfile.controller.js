import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {AsyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"; 
import { Review } from "../models/review.model.js";  


export const getUserProfile = AsyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id).select("-password")
    if(!user){
        throw new ApiError(404,"user not found")
    }
    return res.status(200)
    .json(new ApiResponse(200,{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        subscription:user.subscription,
        bookmark:user.bookmarkedAnime
    },"user profile"))

})



