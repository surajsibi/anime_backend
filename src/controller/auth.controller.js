import jwt from "jsonwebtoken"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {AsyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

//register user


export const resiterUser = AsyncHandler(async(req,res,next)=>{
    const {email,name,password} = req.body

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json(new ApiResponse(400,user,"user already exist"))
    }

    const newUser = await User.create({email,name,password})
    return res.status(201).json(new ApiResponse(201,newUser,"user created"))
})

export const loginUser = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
   const user  = await User.findOne({email})
   if(!user){
    throw new ApiError(401,"user not found")
   }
   const match = await user.matchPassword(password)
   if(!match){
    throw new ApiError(401,"password not match")
   }
   const token  = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
   const option ={
    httpOnly:true,
    secure:true,
   }

   return res.status(200)
   .cookie("token",token,option)
   .json(new ApiResponse(200,{user},"login success"))
})


export const upgrade = AsyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(user.subscription === "paid"){
        throw new ApiError(400,"you are already a paid user")
    }
   const updatedUser = await User.findByIdAndUpdate(req.user._id,{subscription:"paid"},{new:true})
   if(!updatedUser){
    throw new ApiError(400,"user not found")
   }
   return res.status(200).json(new ApiResponse(200,updatedUser,"success"))
})