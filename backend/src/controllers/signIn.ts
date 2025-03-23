import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "../drizzle"
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import "dotenv/config"
import jwt from "jsonwebtoken"
const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY)
export const signIn = async (req: Request, res: Response) => {
  try {
    const parsedBody = signInSchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid Credentials",
        errors: parsedBody.error.format(),
        success: false,
      });
      return;
    }
    const {email, password} = parsedBody.data;
    const user = await db.select().from(UserTable).where(eq(UserTable.email, email))
    
    if(!user.length){
        res.status(400).json({
            message: "User doesn't exist!",
            success: false,
        });
        return;
    }

    const hashedPassword: string = user[0].password;
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
    if(!isMatch){
        res.status(400).json({
            messaage: "Invalid Password",
            success: false,
        });
        return;
    }
    const token = jwt.sign({
        email: user[0].email
    }, SECRET_KEY!);
    res.status(200).json({
        message: "Sign in successful",
        token: token,
        success: true
    })

    



} catch (e) {}
};
