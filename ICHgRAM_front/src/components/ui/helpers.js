export const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const formatUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("data:") || url.startsWith("http")) {
    return url;
  }
  // Убираем лишние слэши и склеиваем
  return `${BE_URL.replace(/\/$/, "")}${url.startsWith("/") ? url : "/" + url}`;
};

export const timeAgo = (date) => {
  if (!date) return "just now";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 604800;
  if (interval > 1) return Math.floor(interval) + " weeks ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  return Math.floor(seconds / 60) + " minutes ago";
};
