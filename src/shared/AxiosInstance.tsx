import axios from "axios";
import { API_URL } from "../config";

const AxiosInstance = axios.create({
  baseURL: API_URL, // Set your base API URL
  // timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    // Add any custom headers you may need
  },
});

export default AxiosInstance;
