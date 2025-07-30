import {config} from "dotenv"
import express, { Request, Response } from "express"
import router from "@/routes/index"

config()
const app = express()
app.use(express.json());

app.use("/", router)

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});