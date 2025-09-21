import axios from "axios";

const client = axios.create({
    baseURL: "https://abbeyplaybook.onrender.com/api",
    withCredentials: true,
  headers: { "Content-Type": "application/json" },
})

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
     console.log("Interceptor adding token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default client