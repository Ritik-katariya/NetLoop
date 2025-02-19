import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";

router.post("/",auth(),CloudinaryHelper.upload.single("file"),(req: Request, res: Response, next: NextFunction) => {
    return postController.createPost(req, res, next);
  }
);

router.get("/", postController.getPosts);

router.get("/:id?",auth(), postController.getonePost);
router.get("/home-post/:id?", postController.getHomePagePosts);
router.get("/member/:id?",auth(), postController.getPostbyMember);

router.patch("/:id?",auth(),CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return postController.updatePost(req, res, next);
  }
);

router.delete("/:id?",auth(), postController.deletePost);

export const postRouter = router;
