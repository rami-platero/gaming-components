import axios from 'axios'
import config from '../config/config'

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    withCredentials: true
})

export default axiosInstance

import.meta.env.VITE_REACT_BASE_API_URL