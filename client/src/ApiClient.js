import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5001/api/",
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
