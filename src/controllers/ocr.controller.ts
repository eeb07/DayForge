import type { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import { generateSchedule } from "../services/llm.service.js";
import { createCalanderEvents } from "../services/calendar.service.js";

export const ocrController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: " No image uploaded",

            });
        }
        // create ocr worker 
        const worker = await createWorker("eng");

        // run ocr on upload image 

        const result = await worker.recognize(req.file.path);

        const extractedText = result.data.text;

        const ocrResponse = await generateSchedule(extractedText)

        if (!ocrResponse) {
            return res.status(401).json({
                error: "AI is not generating the Response of the Image "
            })
        }
        console.log(ocrResponse);
        let parsedOcr;
        try {
             parsedOcr  = JSON.parse(ocrResponse);
        } catch (error) {
            return res.status(500).json({
                error: "Invalid JSON from AI",
                raw: ocrResponse // helps in debugging 
            });
        }

        
        const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string;
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

        const tokens = {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN
        };


        await createCalanderEvents(parsedOcr, tokens);
        return res.status(200).json({
            success: true,
            message: "Schedule created and added to Google calendar",
            data: parsedOcr
        });
    } catch (error) {
        console.error("Controller error", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
 
