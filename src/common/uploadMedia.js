import axios from "axios";

export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/de7oltfip/auto/upload";
const CLOUDINARY_UPLOAD_PRESET = "expresso";

export const uploadMedia = async (media) => {
  const formData = new FormData();

  formData.append("file", media);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "social-media");

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
