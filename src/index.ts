import express from "express";

import dotenv from "dotenv"
import router from "./routes/schedule.route.js";

const app = express();

app.use(express.json())
dotenv.config();

app.use("/api",router)

app.listen(3000,()=>{
    console.log("server connected ");
})