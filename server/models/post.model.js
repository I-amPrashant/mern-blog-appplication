import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  content:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
    default:"https://plus.unsplash.com/premium_photo-1672363353886-a106864f5cb9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D"
  },
  category:{
    type:String,
    default:"uncategorized"
  },
  slug:{
    type:String,
    required:true,
    unique:true,
  },
  
}, {timestamps:true});

export default mongoose.model("post", postSchema);
