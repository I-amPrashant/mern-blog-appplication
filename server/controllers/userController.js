import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export  const test=async (req, res)=>{
    res.json({message:"api is working"})
}

export const updateUser=async(req, res, next)=>{
   if(req.user.id!==req.params.userId){
    return next(errorHandler(401, "not authorized to update user"));
   }

   if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400, "password must be at least 6 characters"));
        
    }
    req.body.password=bcryptjs.hashSync(req.body.password, 10);
   }

    if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400, "username must be between 7 and 20 characters"));
    }
    if(req.body.username.includes(" ")){
        return next(errorHandler(400, "username cannot contain spaces"));
    }
    if(req.body.username!==req.body.username.toLowerCase()){
        return next(errorHandler(400, "username must be lowercase"));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400, "username must be alphanumeric"));
    }


    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username: req.body.username,
                email:req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        }, {new:true});

        const {password, ...rest}=updatedUser._doc;
        res.status(200).json({
            message:'User updated successfully',
            validUser:rest
        });

    }catch(err){
        next(err);
    }
}

export const deleteUser=async(req, res, next)=>{
    console.log(req.params.userId, req.user.id);
    if(!req.user.isAdmin &&  req.user.id!==req.params.userId){
        return next(errorHandler(403, "not authorized to delete user"));
    }

    try{
        await User.findByIdAndDelete(req.params.userId);

        res.status(200).json({
            message:"user has been deleted",
        })
    }catch(err){
        next(err);
    }
}

export const signout=async(req, res, next)=>{

    try{
        res.clearCookie('access_token').status(200).json({
            message:"user has been signed out",
        })
    }catch(err){
        next(err);
    }
}

export const getUsers=async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(401, "unauthorized"));
    }

    try{
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit=parseInt(req.query.limit) || 9;
        const sortDirection=req.query.order==="asc" ? 1 : -1;

        const users=await User.find().sort({
            createdAt:sortDirection
        }).skip(startIndex).limit(limit);

        const userWihoutPassword=users.map((user)=>{
            const {password, ...rest}=user._doc;
            return rest;
        })

        const totalUsers=await User.countDocuments();
        const now=new Date();

        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const oneMonthAgoUsers=await User.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        res.status(200).json({
            users:userWihoutPassword,
            totalUsers,
            oneMonthAgoUsers
        })


    }catch(err){
        next(err);
    }
}

export const getUser=async(req, res, next)=>{
    try {
            const user=await User.findById(req.params.userId);
            if(!user){
                return next(errorHandler(404, "user not found"));
            }
            const {password, ...rest}=user._doc;
            res.status(200).json({
                users:rest
            })
    } catch (error) {
        next(error)
    }
}