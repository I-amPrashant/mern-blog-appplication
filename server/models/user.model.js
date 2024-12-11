import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true 
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
    },
}, {timestamps:true});

export default  mongoose.model("user", userSchema);