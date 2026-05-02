import type {Request, Response} from "express";
import { generateSchedule } from "../services/llm.service.js";
import { createCalanderEvents } from "../services/calendar.service.js";
import dotenv from "dotenv";

dotenv.config();

export const generateSchedulerController= async(req: Request, res: Response)=>{
    try{
        const {prompt} = req.body;

        if(!prompt || typeof prompt !== "string"){
            return res.status(400).json({
                error: "Prompt is required and must be a string"
            });
        }

        // call Ai service 

        const aiResponse = await generateSchedule(prompt);
        let parsed;

        if(!aiResponse){
            return res.status(401).json({
                error: "AI is not generating the Response"
            })
        }
        console.log(aiResponse)
        try{
            parsed = JSON.parse(aiResponse);
        } catch(error){
            return res.status(500).json({
                error: "Invalid JSON from AI", 
                raw: aiResponse // helps in debugging 
            });
        }
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string ;
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN  as string;

        const tokens = {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN
        };
        await createCalanderEvents(parsed,tokens);
        return res.status(200).json({
            success: true, 
            message: "Schedule created and added to Google calendar",
            data: parsed
        });
    } catch(error){
        console.error("Controller error", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};



