import { Router } from "express";
import ProfileContoller from "../profiles/profile.controller";

const router = Router();

router.post("/new", ProfileContoller.createProfile);

export default router;
