import axiosInstance from "./axiosInstance";

export const fetchAllPosts = async (page = 1, limit = 4) => {
  try {
    const response = await axiosInstance.get(
      `/api/posts?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
