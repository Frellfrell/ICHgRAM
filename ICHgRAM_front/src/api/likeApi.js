import axios from "axios";

const API_URL = "http://localhost:5000/api/likes";

export const toggleLike = async (postId, token) => {
  const response = await axios.post(
    `${API_URL}/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
};
