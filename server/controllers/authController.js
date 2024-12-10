import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup= async(req, res, next)=>{
    const {username, email, password}=req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){
        return next(errorHandler(400,'All fields are required' ))
    }

    const hashedPassword= bcryptjs.hashSync(password, 10);
    
const newUser=new User({
        username, email, password:hashedPassword
    })

    try{
        await newUser.save();
        res.status(200).json({message
            : "Signup successful"
        })
    }catch(e){
        next(e);
    }
}

export const signin=async(req, res, next)=>{
    const {email, password}=req.body;
    
    if(!email || !password || email==='' || password===''){
        return next(errorHandler(400,'All fields are required' ))
    }

    try{
        const user=await User.findOne({ email });

        if(!user){
            return next(errorHandler(404, 'User not found'));
        }

        const isPasswordCorrect=bcryptjs.compareSync(password, user.password);

        if(!isPasswordCorrect){
            return next(errorHandler(400, 'Invalid credentials'));
        }

        const token=jwt.sign({
            id:user._id
        }, process.env.JWT_SECRET);

        const {password:pass, ...rest}=user._doc;

        res.status(200).cookie('access_token', token, {httpOnly: true}).json({
            message: 'Signin successful',
            validUser:rest
        })

    }catch(err){
        next(errorHandler(500, err.message));
    }
}