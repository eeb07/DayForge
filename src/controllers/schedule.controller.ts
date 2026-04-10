import type {Request, Response} from "express";
import { generateSchedule } from "../services/llm.service.js";

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

        try{
            parsed = JSON.parse(aiResponse);
        } catch(error){
            return res.status(500).json({
                error: "Invalid JSON from AI", 
                raw: aiResponse // helps in debugging 
            });
        }

        return res.status(200).json({
            success: true, 
            data: parsed
        });
    } catch(error){
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}