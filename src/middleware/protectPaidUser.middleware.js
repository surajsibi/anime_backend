import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const paidUser = AsyncHandler(async (req, res, next) => {
    if(req.user && req.user.subscription === "paid"){
        return next();
    }
    else{
        throw new ApiError(401,"You need a paid subscription to access this content")
    }
})