import axios from "axios";

export const convertImageTo3D = async (imageUrl) => {
  try {
    const response = await axios.post("/api/convertImageTo3D", { imageUrl });
    return response.data;
  } catch (error) {
    console.error("Error converting image:", error.response?.data || error.message);
    return null;
  }
};
