import express from "express";
import "dotenv/config"
import linkRoutes from './routes/route'
import cors from "cors"
import redirectRouter from "./routes/redirectUrl";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/api/v1',linkRoutes );
app.use('/', redirectRouter)

app.listen(port, ()=>{
    console.log("listening")
    
})