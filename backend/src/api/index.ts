import express from "express";
import "dotenv/config"
// const express = require('express')
// const dotenv = require('dotenv').config()
import linkRoutes from '../routes/route'
import cors from "cors"
import redirectRouter from "../routes/redirectUrl";
import { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin : ["https://link-leap-sigma.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET"]
}));
app.use(express.json());
app.use('/api/v1',linkRoutes );
app.use('/', redirectRouter)

app.get('/', (req:Request, res:Response) => {    
    res.send('Hello World')
})
if (process.env.NODE_ENV !== 'production') {
    app.listen(3001, () => {    
        console.log('Server is running on port 3000')
    })
}
// module.exports = app 
export default app