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