import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    animeId:{
        type:Number,
        required:true
    },
    animeTitle:{
        type:String
    },
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:10

    }
},{timestamps:true})

export const Review = mongoose.model("Review",reviewSchema)