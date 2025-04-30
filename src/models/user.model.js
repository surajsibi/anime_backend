import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    bookmarkedAnime: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anime' }],
    subscription:{
        type:String,
        enum:["free","premium"],
        default:"free"
    },
    role:{type:String,enum:["user","admin"],default:"user"}
})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password)
}


export const User = mongoose.model("User",userSchema)
