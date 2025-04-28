import { Outlet } from "react-router";
import { AppProvider } from "./AppContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function App() {
    useEffect(() => {
        const interval = setInterval(async () => {
            await axios.get("/sanctum/csrf-cookie", {
                withCredentials: true,
                withXSRFToken: true,
            });
        }, 900000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <AppProvider>
            <Outlet />
            <ToastContainer />
        </AppProvider>
    );
}
