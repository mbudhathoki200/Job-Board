import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const uploadImageOnCloudinary = async (
  localFilePath: string,
  fileType: "image" | "raw" = "image"
) => {
  try {
    if (!localFilePath) return null;

    const options = {
      resource_type: fileType,
    };

    const response = await cloudinary.uploader.upload(localFilePath, options);
    console.log("Cloudinary response:", response);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};
