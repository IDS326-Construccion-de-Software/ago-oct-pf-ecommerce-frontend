import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default axiosClient;