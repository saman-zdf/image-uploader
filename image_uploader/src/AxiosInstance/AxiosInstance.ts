import axios from 'axios';
import { Environment } from '../utils/Enums&Constants';

const serverBaseURL = Environment.DEVELOPMENT ? 'http://localhost:8080' : 'https://something.com';
const axiosInstance = axios.create({
  baseURL: serverBaseURL,
});

export default axiosInstance;
