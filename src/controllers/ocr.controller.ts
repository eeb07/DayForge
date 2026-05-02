import type { Request, Response } from "express";
import { createWorker } from "tesseract.js";

export const ocrController = async (req:Request, res:Response)=>{
    try{
        if(!req.file){
        return res.status(400).json({
            error:" No image uploaded", 

        });
    }


    // create ocr worker 

    const worker  = await createWorker("eng");

    // run ocr on upload image 

    const result = await worker.recognize(req.file.path);

    const extractedText = result.data.text;

    await worker.terminate();

    return res.status(200).json({
        success: true, 
        text: extractedText,
    });
    } catch(e){
        return res.status(500).json({
            error: "Failed to extract text"
        });
    }  
};