import { Request, Response } from 'express';
import { uploadToDrive } from '../utils/uploadToDrive';
import dotenv from 'dotenv';

dotenv.config();

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file as Express.Multer.File; 
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const folderId = process.env.GDRIVE_FOLDER_ID;
    if (!folderId) {
      res.status(500).send("Google Drive folder ID not configured");
      return;
    }

    const link = await uploadToDrive(
      file.buffer,
      file.originalname,
      file.mimetype,
      folderId
    );

    res.status(200).json({ link });

  } catch (error) {
    console.error(error);
    res.status(500).send("Upload failed");
  }
};
