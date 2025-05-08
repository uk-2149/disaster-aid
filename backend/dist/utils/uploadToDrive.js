"use strict";
// import { google } from 'googleapis';
// import { auth } from '../config/driveAuth';
// import { Readable } from 'stream';
// export const uploadToDrive = async (
//   fileBuffer: Buffer,
//   filename: string,
//   mimeType: string,
//   folderId: string
// ): Promise<string> => {
//   const drive = google.drive({ version: 'v3', auth });
//   const response = await drive.files.create({
//     requestBody: {
//       name: filename,
//       parents: [folderId],
//     },
//     media: {
//       mimeType,
//       body: Readable.from(fileBuffer),
//     },
//     fields: 'id',
//   });
//   const fileId = response.data.id;
//   if (!fileId) {
//     throw new Error('Failed to upload file to Drive');
//   }
//   await drive.permissions.create({
//     fileId,
//     requestBody: {
//       role: 'reader',
//       type: 'anyone',
//     },
//   });
//   return `https://drive.google.com/uc?id=${fileId}`;
// };
