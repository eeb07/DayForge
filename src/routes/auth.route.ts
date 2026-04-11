import express from "express" ;

import {google} from "googleapis";
import dotenv from "dotenv";
import { oauth2 } from "googleapis/build/src/apis/oauth2/index.js";
import { reseller } from "googleapis/build/src/apis/reseller/index.js";

dotenv.config();

const authrouter = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, 
    process.env.GOOGLE_CLIENT_SECRET, 
    process.env.GOOGLE_REDIRECT_URI
);


// LOGIN ROUTE 

authrouter.get("/google", (req, res)=>{
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline", 
        scope:["https://www.googleapis.com/auth/calendar"],
    });

    res.redirect(authUrl);
});

// callback route

authrouter.get("/google/callback", async(req,res)=>{
    try{
        const code = req.query.code as string;

        if(!code){
            return res.status(400).send("No code provided");

        }
        const {tokens} = await oauth2Client.getToken(code);

        console.log("TOKENS", tokens);

        res.send("Google authentication successful")
    }catch(error){
        console.error("OAuth Error", error);
        res.status(500).send("Authentication failed")

    }
});

export default authrouter;


