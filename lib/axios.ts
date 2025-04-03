import axios from "axios";

const _url =
  `${process.env.NEXT_PUBLIC_API_URL}` || "http://localhost:5000/api";

  console.log('_url', _url);
const axiosInstance = axios.create({
  baseURL: _url,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

export default axiosInstance;
