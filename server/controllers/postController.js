import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(401, "unauthorized"));
  }

  if (!title || !content || title === "" || content === "") {
    return next(errorHandler(400, "Fill in the required fields"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-')
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost=await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    })

  } catch (err) {
    next(err);
  }
};
