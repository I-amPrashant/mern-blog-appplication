import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './database/db.js'
import userRoutes from './routes/userRoute.js'


const app=express();
dotenv.config();
app.use(cors())

connectDb();


app.use('/api/user', userRoutes);
const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}) 