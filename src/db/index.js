import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host ${connectionInstance.connection.host}`)

        console.log(connectionInstance)

    }
    catch (err) {
        console.log("mongodb connection error",err)
        process.exit(1)
    }
}

export default connectDB
