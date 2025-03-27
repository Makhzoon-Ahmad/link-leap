import { Request,Response } from "express";
import {z} from "zod";
import { db } from "../drizzle";
import "dotenv/config"
import { linkTable } from "../drizzle/schema"
// import { nanoid } from "nanoid"
// const { nanoid } = require("nanoid");
import { eq } from "drizzle-orm";
import { addMinutes } from "date-fns";
import {Auth} from "../middlewares/authMiddleware"


const BASE_URL = process.env.BASE_URL;
const urlSchema = z.object({
    url : z.string().url()
})
async function nanoid(size:number) {
    const { nanoid } = await import('nanoid');
    return nanoid(size);
}
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
        const userId = (req as Auth).user?.id ?? null;
        const shortId: string = await nanoid(7);
        const shortUrl: string = `${BASE_URL}/${shortId}`;
        const originalUrl: string = parsed.data.url;
        const result = await db.insert(linkTable).values({
            link : originalUrl,
            shortLink: shortUrl,
            expiryDate: addMinutes(new Date(), 7),
            userId: userId ?? null
        })
        
        console.log(result)
        res.status(200).json({
            message: "Short URL generated!",
            shortUrl : shortUrl,
            success:true
        })

    }catch{
        res.status(500).json({
            message : "Internal Server Error",
            success:false
        })
    }
    
}


export default shortenUrl