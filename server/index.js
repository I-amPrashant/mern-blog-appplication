import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


const app=express();
dotenv.config();
app.use(cors())


const port=process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`Server is running on port ${port}`);
})