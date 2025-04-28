import { useAppContext } from "@/AppContext";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
    const { redirectIfLoggedIn, loading } = useAppContext();
    useEffect(() => {
        (async () => {
            await redirectIfLoggedIn();
        })();
    }, []);
    return (
        <div className="flex justify-center flex-1 items-center">
            <div className="space-y-4 w-96">
                {loading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <span className="loading loading-dots loading-xl"></span>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}
