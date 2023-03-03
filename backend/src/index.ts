import express, { Request, Response } from "express";
import uploadImagRouter from "./routes/imageUploadRoute.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Health check for upload image sever...");
});

// Upload image

app.use("/image", uploadImagRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`app is listen on port ${process.env.PORT}`);
});
