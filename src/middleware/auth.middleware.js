import jwt from "jsonwebtoken"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"


export const authMiddleware  = async(req,resizeBy,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            throw new ApiError(401,"token not valid")
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        const user = await User.findById(decoded.userId)
        if(!user){
            throw new ApiError(401,"user not found")
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
}
}