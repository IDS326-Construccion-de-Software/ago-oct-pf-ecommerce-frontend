import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://localhost:5215/api",
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
    }
});

export default axiosClient;