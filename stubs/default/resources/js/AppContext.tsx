import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AppState, User } from "./types";
import apiClient from "./utils/apiClient";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const AppContext = createContext<AppState | null>(null);

export const AppProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        document.title = import.meta.env.VITE_APP_NAME;
    }, [location]);

    useEffect(() => {
        const initData = document.body.dataset.init;
        if (initData) {
            const flashedData = JSON.parse(initData).flash;
            for (const flashType of [
                "info",
                "success",
                "warning",
                "error",
                "default",
            ]) {
                if (flashedData[flashType]) {
                    toast[flashType](flashedData[flashType], {
                        position: "top-center",
                    });
                }
            }
        }

        return () => {
            document.body.removeAttribute("data-init");
        };
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await apiClient.post("logout");
            const response = await apiClient.get("user");
            setUser(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw e;
        }
    }, []);

    const redirectIfLoggedIn = useCallback(async () => {
        setLoading(true);
        try {
            await apiClient.get("check");
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw e;
        }
    }, []);

    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get("user");
            setUser(response.data.data);
            setLoading(false);
            return response;
        } catch (e) {
            setLoading(false);
            throw e;
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                loading,
                loadUser,
                logout,
                redirectIfLoggedIn,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppState => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
