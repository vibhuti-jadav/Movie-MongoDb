import mongoose from "mongoose";

const connectDb = async ()=>{

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)

    return connect;
    } catch (error) {
        console.log("mongodb connection failed:",error.message)
        return null
        
    }
}

export default connectDb



