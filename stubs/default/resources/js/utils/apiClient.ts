import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
    withXSRFToken: true,
});

export const requestInterceptor = apiClient.interceptors.request.use(
    function (config) {
        if (
            config.method === "put" ||
            config.method === "patch" ||
            config.method === "delete"
        ) {
            const formData = config.data;
            if (formData instanceof FormData) {
                formData.append("_method", config.method.toUpperCase());
                config.method = "post";
                config.data = formData;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const responseInterceptor = apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            location.href = "/auth/login";
        }
        if (
            error.response &&
            error.response.status === 403 &&
            error.response.data.error === "already_logged_in"
        ) {
            location.href = "/dashboard";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
