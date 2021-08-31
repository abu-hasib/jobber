import { Router } from "express";
import JobContoller from "../jobs/job.controller";
const router = Router();

router.get("/", JobContoller.getAllJobs);
router.post("/new", JobContoller.createNewJob);

export default router;
