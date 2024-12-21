import express from "express";
import {createComment, getPostComments} from "../controllers/commentController.js";
import {verifyUser} from "../utils/verifyUser.js";

const router=express.Router();

router.post('/create',verifyUser, createComment);
router.get('/getPostComments/:postId', getPostComments);

export default router;