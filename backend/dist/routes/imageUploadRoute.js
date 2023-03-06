import express from "express";
const router = express.Router();
import { cloudinaryUploadImage, s3UploadImage, getImage, } from "../controllers/imageUploadController.js";
router.post("/image-upload-cloudinary", cloudinaryUploadImage);
router.post("/get-image/:id", getImage);
router.post("/image-upload-s3", s3UploadImage);
export default router;
