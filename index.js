import express from "express";
import dotenv from "dotenv";
import roomRouter from "./routes/roomRouter.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

//MongoDB Connect
mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

//Connect Server
const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => {
    console.log(`Server connected to PORT ${PORT}`);
  })
  .on("error", (e) => {
    console.log("Error happened: ", e.message);
  });
