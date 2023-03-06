import express from "express";
import uploadImagRouter from "./routes/imageUploadRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import fileupload from "express-fileupload";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Health check
app.get("/", (req, res) => {
    res.send("Health check for upload image sever...");
});
// Upload image
app.use("/", uploadImagRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app is listen on port ${process.env.PORT}`);
});
