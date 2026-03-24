import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/*export const getAllPosts = async () => {
  //const token = localStorage.getItem("token");
  //const response = await axios.get(`${BASE_URL}/api/posts`, {
    //headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Получаем массив постов из seed.js
};*/

export const fetchAllPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
