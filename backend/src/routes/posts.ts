import { Router, Request, Response } from "express";
import { getPosts, deletePost, insertPost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.delete("/", async (req: Request, res: Response) => {
  const postId = req.query.postId?.toString();
  const userId = req.query.userId?.toString();
  if (!postId || !userId) {
    res.status(400).send({ error: "postId and userId are required" });
    return;
  }
  const result = await deletePost(postId, userId);
  res.status(200).send(result);
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, title, body } = await req.body;
  if (!userId || !title || !body) {
    res.status(400).send({
      error: "User ID, post title and post content are required",
    });
    return;
  }
  const result = await insertPost(userId, title, body);
  res.status(201).send(result);
});

export default router;
