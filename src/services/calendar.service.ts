import dotenv from "dotenv";
import {google} from "googleapis";
import type { Task } from "../utils/logger.js";

dotenv.config();

 export const createCalanderEvents = async(
    tasks: Task[],
    tokens: {
        access_token: string;
        refresh_token: string;
    }
 )=>{
    try{
        // create OAuth

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID, 
            process.env.GOOGLE_CLIENT_SECRET, 
            process.env.GOOGLE_REDIRECT_UTI
        );

        // SET USER TOKEN 

        oauth2Client.setCredentials({
            access_token: tokens.access_token, 
            refresh_token: tokens.refresh_token,

        });

        // initialize calendar

        const calendar = google.calendar({

            version: "v3", 
            auth: oauth2Client,

        });

        const todayDate = new Date().toISOString().split("T")[0];
        const now = new Date();

        const year = now.getFullYear();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        
        const today = `${year}-${month}-${day}`;

        // loop through tasks

        for(const t of tasks){
            if(!t.start_time) continue; // skips the tasks without time

            // create start datetime 
            const startDateTime = new Date(`${todayDate}T${t.start_time}:00`);

            // calculate end datetime 
           
            const endDateTime = new Date(
                startDateTime.getTime() + t.duration_minutes * 60000
            );

            // create event 
            await calendar.events.insert({
                calendarId: "primary", 
                requestBody: {
                    summary: t.task, 
                    description: `Category: ${t.category}`,
                    start: {
                        dateTime: startDateTime.toISOString(),
                        timeZone: "Asia/Kolkata", 

                    },
                    end: {
                        dateTime: endDateTime.toISOString(),
                        timeZone: "Asia/Kolkata", 
                    },
                    reminders:{
                        useDefault: false, 
                        overrides: [
                            {
                                method:"popup", minutes: 10
                            },
                        ],
                    },
                },
            });
            console.log(`Event created: ${t.task}`);
        }
        return {success: true};

    }catch(error){
        console.error("Calendar Error:", error);
        throw new Error("Failed to create calendar events");

    }
 };

