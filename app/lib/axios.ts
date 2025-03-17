
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PRIVATE_API_BASE_URL || "https://api.giftingsaga.com/api/v1",
  timeout: 30000,
  headers: { 'X-Custom-Header': 'foobar' }
});