import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './database/db.js'


const app=express();
dotenv.config();
app.use(cors())

connectDb();


const port=process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`Server is running on port ${port}`);
}) 