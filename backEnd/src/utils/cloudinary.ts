import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error(error);

    if (localFilePath) {
      unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
    }

    return null;
  }
};

export { uploadOnCloudinary };
