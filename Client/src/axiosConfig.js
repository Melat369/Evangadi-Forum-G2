import axios from 'axios';

const axiosBase = axios.create({
  baseURL: "http://77.37.74.90",
  withCredentials: true,
});
export default axiosBase;
