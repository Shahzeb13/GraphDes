import cloudinary from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn("CLOUDINARY_CLOUD_NAME is not set — image uploads will fail.");
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryV2 = cloudinary.v2;