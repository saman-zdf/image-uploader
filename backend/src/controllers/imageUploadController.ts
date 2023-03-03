import { Request, Response } from "express";
import uploadImage from "../services/cloudinaryFileUpload.js";
import uploadFileS3 from "../services/awsFileUpload.js";

const cloudinaryUploadImageController = async (req: Request, res: Response) => {
  const { image } = req.body;

  const result = await uploadImage(image);

  res.status(201).json({ imageLink: result.secure_url });
};

const s3UploadImageController = async (req: Request, res: Response) => {
  const result = await uploadFileS3(req, res);

  res.status(201).json({ imageLink: result });
};

export { cloudinaryUploadImageController, s3UploadImageController };
