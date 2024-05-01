import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import * as dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import sharp from "sharp";

const usersBucketName = process.env.AWS_USERS_BUCKET_NAME!;
const productBucketName = process.env.AWS_PRODUCTS_BUCKET_NAME!;
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
    .resize({ height: 150, width: 150, fit: "cover" })
    .toBuffer();
  const imageName = randomImageName();

  const params = {
    Bucket: usersBucketName,
    Body: buffer,
    Key: 'avatar/' + imageName,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
  return imageName;
};

export const uploadProductFile = async (file: Express.Multer.File) => {
  const imageName = randomImageName();

  const params = {
    Bucket: productBucketName,
    Body: file.buffer,
    Key: imageName,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
  return imageName
};

export const deleteFile = async (fileKey: string) => {
  const params = {
    Bucket: usersBucketName,
    Key: fileKey,
  };

  const command = new DeleteObjectCommand(params)
  return await s3.send(command)
}
