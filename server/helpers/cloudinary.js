import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});


const storage = multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });
