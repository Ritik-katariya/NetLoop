import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import { ICloudinaryResponse } from "../interfaces/file";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload Image with Compression
const uploadImage = async (file: Express.Multer.File): Promise<ICloudinaryResponse> => {
  if (!file || !file.buffer) {
    throw new Error("Image file not provided or invalid");
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "doctorOnCall",
        format: "webp", // Convert to WebP
        transformation: [{ quality: "auto:good" }], // Optimize quality
      },
      (error, result) => (error ? reject(error) : resolve(result as any))
    ).end(file.buffer);
  });
};

// ✅ Upload Video & Convert to HLS (.m3u8)
const uploadVideo = async (file: Express.Multer.File): Promise<ICloudinaryResponse> => {
  if (!file || !file.buffer) {
    throw new Error("Video file not provided or invalid");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "doctorOnCall",
        format: "mp4", // Upload as MP4 first
        eager: [
          { streaming_profile: "hd", format: "m3u8" }, // ✅ Generate HLS
          { width: 300, height: 300, crop: "thumb", format: "jpg" }, // ✅ Extract thumbnail
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (!result) {
            return reject(new Error("Upload failed, result is undefined"));
          }
          resolve({
            asset_id: result.asset_id,
            public_id: result.public_id,
            version: result.version,
            version_id: result.version_id,
            signature: result.signature,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
            created_at: result.created_at,
            tags: result.tags,
            bytes: result.bytes,
            type: result.type,
            etag: result.etag,
            placeholder: result.placeholder,
            url: result.url,
            secure_url: result.secure_url,
            access_mode: result.access_mode,
            original_filename: result.original_filename,
            hls_url: result.eager?.[0]?.secure_url || null, // ✅ Store HLS URL
            thumbnail_url: result.eager?.[1]?.secure_url || null, // ✅ Store Thumbnail
            folder: result.folder,
            api_key: result.api_key,
          });
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};


// ✅ Get Video Metadata (Check duration)
const getVideoMetadata = async (file: Express.Multer.File): Promise<{ duration: number }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "temp" }, // Temporary upload
      (error, result: any) => {
        if (error) return reject(error);
        resolve({ duration: result.duration });
        cloudinary.uploader.destroy(result.public_id); // Delete temp file
      }
    ).end(file.buffer);
  });
};

export const CloudinaryHelper = {
  uploadImage,
  uploadVideo,
  getVideoMetadata,
  upload,
};
