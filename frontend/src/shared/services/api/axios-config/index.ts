import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors/";
import { Environment } from "@/shared/environment";

axios.defaults.withCredentials = false;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers: {
        'Content-Type': 'application/json',
    }
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('APP_ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };
