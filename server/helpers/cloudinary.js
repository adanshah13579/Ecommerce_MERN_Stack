import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name:"dzclypj97",
  api_key:"955756829328738",
  api_secret: "mp7t8197M51sRX_vfHpfxC9pGSk",
});

const storage = multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });
