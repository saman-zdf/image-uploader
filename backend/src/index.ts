import express, { Request, Response } from "express";
import AWS from "aws-sdk";
import fs from "fs";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const app = express();

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "App for image uploader challenge" });
});

// Make a call to aws s3
app.post("/image-upload", (req: Request, res: Response) => {
  const imagePath = req.body.imagePath;
  const blob = fs.readFileSync(imagePath);
  const uploadedImage = s3
    .upload({
      // I need to fix this issue
      // @ts-ignore
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "image.jpg",
      Body: blob,
    })
    .promise();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`app is listen on port ${8080}`);
});
