import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "../drizzle";
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

async function signUp (req: Request, res: Response){
  const parsedBody = userSchema.safeParse(req.body);
  if (!parsedBody.success) {
      res.status(400).json({
      message: "Invalid Credentials",
      errors: parsedBody.error.format(),
      success: false,
    });
    return;
  }
  const email = parsedBody.data.email;
  const password = parsedBody.data.password;
  const hashedPassword = await hashPassword(password);
  try {
    const existingUser = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    if (existingUser.length > 0) {
        res.status(400).json({
        message: "Email already in use",
        success: false,
      });
      return;
    }
    await db.transaction(async (tx) => {
      await tx.insert(UserTable).values({
        email: email,
        password: hashedPassword,
      });
    });

    res.status(201).json({
        message: "User created successfully",
        success: true
    })
    
  } catch(e) {
        console.log("Error creating user : ", e);
         res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
        
  }

};

export default signUp;
