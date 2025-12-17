import { getCloudinary } from "../lib/cloudinary";
import { bufferToBase64 } from "../utils/helpers";
import crypto from "crypto";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export interface UploadResult {
  publicId: string;
  url: string;
}

export const uploadFileAvatar = async (
  file: Express.Multer.File
): Promise<UploadResult> => {
  const publicId = randomImageName();

  const result = await getCloudinary().uploader.upload(bufferToBase64(file), {
    folder: "users/avatar",
    public_id: publicId,
    crop: "fill",
    gravity: "auto",
    width: 150,
    height: 150,
    fetch_format: "auto",
    quality: "auto",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
};

export const deleteImageFile = async (publicId: string) => {
  return getCloudinary().uploader.destroy(publicId);
};

export const uploadProductImage = async (
  file: Express.Multer.File
): Promise<UploadResult> => {
  const cloudinary = getCloudinary();
  const publicId = crypto.randomBytes(32).toString("hex");

  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "products",
      public_id: publicId,
      resource_type: "image",
      fetch_format: "auto",
      quality: "auto",
      overwrite: false,
    }
  );

  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
};
