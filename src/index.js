import dotenv from "dotenv";
import {app} from "./app.js"
import connectDb from "./db/index.js"

dotenv.config({
    path:"../.env"
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})