import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_ENV_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Upload image function
const uploadImage = async (file: any) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "image_upload_challenge",
    use_filename: true,
    unique_filename: false,
  });

  return result;
};

export default uploadImage;
