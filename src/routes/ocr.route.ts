import express from "express";
import multer from  "multer"
import { ocrController } from "../controllers/ocr.controller.js";
import type { Router } from "express";
import router from "./schedule.route.js";

// store uploaded files in uploads 
const upload = multer({dest:"uploads/"});
const ocrRouter = express.Router();


ocrRouter.post("/ocr",upload.single("image"),ocrController)

export default ocrRouter;

