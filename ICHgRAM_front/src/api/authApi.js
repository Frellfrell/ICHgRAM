import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 1.  регистрация
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data; // Возвращаем данные { message, token }
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" }; // Выбрасываем ошибку дальше, чтобы компонент её поймал
  }
};

// 2. логин
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", credentials);

    // Достаём токен и юзера
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Invalid credentials";
    throw new Error(message);
  }
};

//   выход
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // Очищаем всё
};

// 4. Сброс пароля
export const resetPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/api/auth/reset-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send reset link" };
  }
};
