// In your React Native project

import axios from "axios";

const API_BASE_URL =
  "http://benzine-server.germanywestcentral.azurecontainer.io:5000"; // Update with your actual server address

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Adjust as needed
});

export default api;
