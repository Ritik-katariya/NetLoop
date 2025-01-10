import express, { NextFunction, Request, Response } from "express";
import { CloudinaryHelper } from "../../../helper/uploadHelper";
const router = express.Router();
import { postController } from "./post.controller";

router.post("/",CloudinaryHelper.upload.single("file"),(req: Request, res: Response, next: NextFunction) => {
    return postController.createPost(req, res, next);
  }
);

router.get("/", postController.getPosts);

router.get("/:id?", postController.getonePost);
router.get("/member/:id?", postController.getPostbyMember);

router.patch("/:id?",CloudinaryHelper.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    return postController.updatePost(req, res, next);
  }
);

router.delete("/:id?", postController.deletePost);

export const postRouter = router;
