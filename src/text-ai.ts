import dotenv from "dotenv";
import { generateSchedule } from "./services/llm.service.js";
dotenv.config();

async function test() {
  const prompt =
    "Tomorrow I want to study MERN stack for 2 hours, go to gym at 6pm and revise DSA";

  const result = await generateSchedule(prompt);

  console.log("AI RESPONSE:");
  console.log(result);
}

test();