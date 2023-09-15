import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://date.nager.at/api/v3/",
  timeout: 10000
});

export default axiosInstance;