import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import * as UserService from "../services/user.services";
import * as path from "path";

export function getCurrentUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  return res.status(HttpStatusCodes.OK).send(user);
}

// export async function uploadResume(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const localFilePath: any = req.files;
//   let resumeUrl;
//   if (localFilePath.resume) {
//     resumeUrl = localFilePath.resume[0].path;
//   }
//   await UserService.uploadResume(resumeUrl);
// }

export async function uploadResume(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files && files.resume) {
      const localFilePath = files.resume[0].path;
      const fileExtension = path.extname(localFilePath).toLowerCase();
      let fileType: "image" | "raw" = "raw";

      if ([".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension)) {
        fileType = "image";
      }

      const response = await UserService.uploadResume(localFilePath, fileType);
      if (response?.secure_url) {
        res.status(200).json({ url: response.secure_url });
      } else {
        res.status(500).json({ message: "Failed to upload the file." });
      }
    } else {
      res.status(400).json({ message: "No file uploaded." });
    }
  } catch (error) {
    console.error("Error in uploadResume controller:", error);
    next(error);
  }
}
