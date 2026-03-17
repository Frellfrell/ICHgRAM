import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 1.  регистрация
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data; // Возвращаем данные { message, token }
  } catch (error) {
    throw error.response?.data || { message: "Server error" }; // Выбрасываем ошибку дальше, чтобы компонент её поймал
  }
};

// 2. логин
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); //сохраняем
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invalid credentials" };
  }
};

// 3.  выход
export const logout = () => {
  localStorage.removeItem("token");
};
