import express from "express";
import { generateSchedulerController } from "../controllers/schedule.controller.js";

const router = express.Router();

router.post("/schedule",generateSchedulerController)

export default router;