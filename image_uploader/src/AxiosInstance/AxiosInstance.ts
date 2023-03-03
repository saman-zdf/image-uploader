import axios from 'axios';
import { Environment } from '../utils/Enums&Constants';

// Production URL
const serverBaseURL = Environment.DEVELOPMENT ? 'https://localhost:8080' : 'https://something.com';
const axiosInstance = axios.create({
  baseURL: serverBaseURL,
});

export default axiosInstance;
