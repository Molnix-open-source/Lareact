import { useAppContext } from "@/AppContext";
import Navbar from "@/Components/Navbar";

import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function AppLayout() {
    const { user, loadUser } = useAppContext();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (user != null) {
                return;
            }

            setLoading(true);
            await loadUser();
            setLoading(false);
        })();
    }, [user]);

    return (
        <>
            {!user || loading ? (
                <div className="flex-1 flex justify-center items-center">
                    <span className="loading loading-dots loading-xl"></span>
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="container flex flex-col m-auto flex-1">
                        <main className=" py-4 flex-1 space-y-6">
                            <Outlet />
                        </main>
                    </div>
                </>
            )}
        </>
    );
}
