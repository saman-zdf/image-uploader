import { Request, Response } from "express";
import uploadFileS3 from "../services/awsFileUpload.js";
import cloudinary from "../services/cloudinaryFileUpload.js";
import { db } from "../utils/db.server.js";

const cloudinaryUploadImage = async (req: Request, res: Response) => {
  const file = req?.files?.image;
  console.log("FIle", file);

  try {
    // @ts-ignore
    const result = await cloudinary.uploader.upload(file?.tempFilePath, {
      folder: "image_upload_challenge",
      use_filename: true,
      // @ts-ignore
      public_id: file?.md5,
      unique_filename: false,
    });
    console.log("Finish uploading in service");

    await db.image.create({
      data: {
        imageURL: result.secure_url,
      },
    });

    res.status(201).json({ result: result.secure_url });

    return result;
  } catch (error) {
    console.log("File", file);
    console.log("This is the error ", error);
  }
};

const s3UploadImage = async (req: Request, res: Response) => {
  const result = await uploadFileS3(req, res);

  res.status(201).json({ imageLink: result });
};

const getImage = async (req: Request, res: Response) => {
  const { id } = req.params as any;

  try {
    const image = await db.image.findFirst({
      where: {
        id,
      },
    });

    if (!image) return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ image } as any);
  } catch (error) {
    console.log("This is the error ", error);
  }
};

export { cloudinaryUploadImage, s3UploadImage, getImage };
