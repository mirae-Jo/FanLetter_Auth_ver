import axios from "axios";
export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
});

export default authInstance;
