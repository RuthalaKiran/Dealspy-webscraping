import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import { connectDB } from "./config/db.js";
import productRouter from "./Routes/productRoute.js";
import cron from "node-cron"
import axios from "axios";
// import { cronjob } from "./cron/cron.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();
// console.log(process.env.PORT)

// middlewares
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

// db
connectDB();



app.get("/", (req, res) => {
  res.send("hello world");
});


// api routes call
app.use("/api/products", productRouter);

cron.schedule('0 0  * * 0', async () => {
  try {
   const response =  await axios.get('http://localhost:4000/api/products/updateproductsbycron');
  //  console.log(response)
    console.log('Products updated successfully');
  } catch (error) {
    // console.error('Error updating products:', error.message);
    console.log(error) 
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
