import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./DB/index.js";
import userRoute from "./routes/user.routes.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//route
app.use('/api/user',userRoute)

connectDB().then(() => {
  app.listen(PORT, () => console.log("app is working"));
});
