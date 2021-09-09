import { Router } from "express";
import { authenticateToken } from "../helpers";
import AuthController from "../users/user.controller";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.post("/signup", AuthController.Signup);
router.post("/login", authenticateToken, AuthController.Login);

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.send(user);
});

router.delete("/:userId", async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);

  console.log(user);

  if (user) {
    await user.remove();
  }
  return res.send(user);
});

router.get("*", function (req, res) {
  res.status(404).end();
});

export default router;
