import express from "express";

import dotenv from "dotenv"
import router from "./routes/schedule.route.js";
import authrouter from "./routes/auth.route.js";
import { ocrController } from "./controllers/ocr.controller.js";
import ocrRouter from "./routes/ocr.route.js";

const app = express();

app.use(express.json())
dotenv.config();

app.use("/api",router)
app.use("/auth", authrouter)
app.use("/api",ocrRouter)

app.listen(5000,()=>{
    console.log("server connected ");
})


