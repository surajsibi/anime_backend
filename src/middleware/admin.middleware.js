import { ApiError } from "../utils/apiError.js"
import { AsyncHandler } from "../utils/asyncHandler.js"
export const adminMiddleware =AsyncHandler( (req,res,next)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403,"admin access only")
    }
    next()
})
