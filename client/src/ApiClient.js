import axios from "axios";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "https://localhost:5001/api"
    : "https://lfg.games/api";

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default apiClient;
