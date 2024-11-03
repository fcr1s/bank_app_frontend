import axios from "axios";

const bank_app_backendServer = import.meta.env.VITE_BANK_APP_BACKEND_SERVER;
const bank_app_backendPort = import.meta.env.VITE_BANK_APP_BACKEND_PORT;

export default axios.create({
    baseURL: `http://${bank_app_backendServer}:${bank_app_backendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});