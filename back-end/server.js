import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import orderRouter from "./routes/order";
import stripeRouter from "./routes/stripe";
require("dotenv").config();

const morgan = require("morgan");
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error: ", err));

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// route middleware
app.use("/api", authRouter);
app.use("/api", roomRouter);
app.use("/api", stripeRouter)
app.use("/api", orderRouter)

const port = process.env.PORT;
app.listen(port, console.log(`Server is running on port ${port}`));
