import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import * as dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import sharp from "sharp";

const bucketName = process.env.AWS_BUCKET_NAME!;
const region = process.env.AWS_BUCKET_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_KEY_ID!;

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadFile = async (file: Express.Multer.File) => {
  const buffer = await sharp(file.buffer)
    .resize({ height: 150, width: 150, fit: "contain" })
    .toBuffer();
  const imageName = randomImageName();

  const params = {
    Bucket: bucketName,
    Body: buffer,
    Key: imageName,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
  return imageName
};

export const getFileURL = async (fileKey: string) => {

  const getObjectParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  const command = new GetObjectCommand(getObjectParams);
  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};
