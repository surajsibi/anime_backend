import mongoose, { connect } from "mongoose";
import {DB_NAME} from "../constant.js"


const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
            console.log(`\n MongoDb connected  !! DB:HOST:${connectionInstance.connection.host} `);
    } catch (error) {
        console.log("mongodb connection error", error);
        process.exit(1);
    }
    
}

export default connectDb