import OpenAI from "openai";
import dotenv from "dotenv";
import scheduleSystemPrompt from "../prompts/scheduler.prompt.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateSchedule = async (userPrompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: scheduleSystemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    return text;
  } catch (error) {
    console.error("OpenRouter error:", error);
    throw new Error("Failed to generate schedule");
  }
};