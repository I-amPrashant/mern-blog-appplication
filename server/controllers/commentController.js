import Comment from "../models/commentModel.js";
import {errorHandler} from "../utils/error.js";

export const createComment=async(req, res, next)=>{
    try{
        const {content, postId, userId}=req.body;

        if(userId!==req.user.id){
            return next(errorHandler(401, "unauthorized"));
        }

        const newComment=new Comment({
            content,
            postId,
            userId
        });
        await newComment.save();
        res.status(201).json({
            message:"comment has been created",
            comment:newComment
        })
    }catch(err){
        next(err)
    }
}