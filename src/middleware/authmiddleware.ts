import type{Request, Response, NextFunction} from "express";

import jwt from "jsonwebtoken";

const JWT_PASSWORD = process.env.JWT_PASSWORD as string;

export const authmiddleware = (req:Request, res:Response, next:NextFunction) =>{

    const header = req.headers["authorization"];

    if(!header){
        return res.status(401).json({
            error: "unauthorized, token missing or invalid "
        });
    }
    try{
        // extract token from the bearer<token>
        const token = header.split(" ")[1];

        if(!token){
            return res.status(401).json({
                error: "Unauthorized, invalid token format "
            });
        }
        const decoded = jwt.verify(token,JWT_PASSWORD);

        if(typeof decoded === "string"){
            return res.status(401).json({
                error: "Unauthorized, token missing or invalid "
            });
        }
        (req as any).user = decoded;

        next();
    }
    catch(error){
        return res.status(401).json({

            error: "Unauthorized, token missing or invalid"
        });

    };               

}




