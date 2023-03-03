import express from "express";
import uploadFileToS3 from "./services/awsFileUpload.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
// Health check
app.get("/", (req, res) => {
    res.send("Starting to learn how to upload image to aws s3 ");
});
// Make a call to aws s3
app.get("/image-upload", (req, res) => {
    uploadFileToS3(req, res);
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app is listen on port ${process.env.PORT}`);
});
