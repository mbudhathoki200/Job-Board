import { UploadApiResponse } from "cloudinary";
import { uploadOnCloudinary } from "./cloudinary";
import loggerWithNameSpace from "./logger";

const logger = loggerWithNameSpace("Upload Utils");
export async function upload(resumePath: string | undefined) {
  logger.info("upload logo");
  let response: UploadApiResponse | null = null;

  if (resumePath) {
    response = await uploadOnCloudinary(resumePath);
  }

  if (response == null) {
    throw new Error();
  }
  return response.secure_url;
}
