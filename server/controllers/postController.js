import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!req.user.isAdmin) {
    console.log("hit");
    return next(errorHandler(401, "unauthorized"));
  }

  if (!title || !content || title === "" || content === "") {
    return next(errorHandler(400, "Fill in the required fields"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = req.query.startIndex || 0;
    const limit = parseInt(req.query.limit) || 9;

    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({
        updatedAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPost = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPost,
    });
  } catch (err) {
    next(err);
  }
};

export const  deletePost=async(req, res, next)=>{
  const {userId, postId}=req.params;

  if(!req.user.isAdmin || req.user.id!==userId){
    return next(errorHandler(401, "unauthorized"));
  }
  try{
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message:"post has been deleted",
    })
  }catch(err){
    next(err);
  }
}
