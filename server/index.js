import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './database/db.js'
import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoute.js'
import cookieParser from 'cookie-parser'

const app=express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(cookieParser())

connectDb();


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 500;
    const message=err.message || "internal server error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}) 