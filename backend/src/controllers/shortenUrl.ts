import { Request, Response } from "express";
import {z} from "zod";
import { db } from "../drizzle";
import { linkTable } from "../drizzle/schema"
import { nanoid } from "nanoid"
import { eq } from "drizzle-orm";


const urlSchema = z.object({
    url : z.string().url()
})

// type URL = z.infer<typeof urlSchema>

async function shortenUrl(req: Request, res:Response){
    try{
        const parsed = urlSchema.safeParse(req.body);
        if(!parsed.success){
            res.status(400).json({
                message : "Invalid Url"
            })
            return;
        }
        const shortId: string = nanoid(7);
        const shortUrl: string = `http://localhost:3000/${shortId}`
        const originalUrl: string = parsed.data.url;
        const result = await db.insert(linkTable).values({
            link : originalUrl,
            shortLink: shortUrl
        })
        
        console.log(result)
        res.status(200).json({
            message: "Short URL generated!",
            shortUrl : shortUrl
        })

    }catch{
        res.status(500).json({
            message : "Internal Server Error",
            
        })
    }
    
}


export default shortenUrl