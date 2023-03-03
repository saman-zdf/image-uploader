import express from "express";
const router = express.Router();
import {
  cloudinaryUploadImageController,
  s3UploadImageController,
} from "../controllers/imageUploadController.js";

router.post("/image-upload-cloudinary", cloudinaryUploadImageController);
router.post("/image-upload-s3", s3UploadImageController);

export default router;
