import AWS from "aws-sdk";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadFileS3(req: Request, res: Response) {
  const image = req.body.image;

  const params = {
    Bucket: process.env.S3_BUCKET || "saman-fayazi",
    Body: image,
    Key: "s3-uploaded-image",
  };

  const result = await s3.putObject(params).promise();
  console.log(`Uploaded file to S3 bucket ${process.env.S3_BUCKET}`);

  return result;
}

export default uploadFileS3;
