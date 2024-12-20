import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postId:{
        type:String,    
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    liked:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default:0
    }
}, {timestamps:true});

export default mongoose.model('comment', commentSchema)