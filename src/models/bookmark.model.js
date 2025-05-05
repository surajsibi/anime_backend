import mongoose,{Schema} from "mongoose";

const bookmarkSchema = new Schema({
    mal_id:{type:Number,required:true},
    title:{type:String,required:true},
    image:{type:String,required:true},
    url:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true}
})

export const Bookmark = mongoose.model("Bookmark",bookmarkSchema)