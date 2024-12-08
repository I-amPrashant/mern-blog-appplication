import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connection successful');
    }catch(err){
        console.log(err)
    };
}
export default connectDb;
