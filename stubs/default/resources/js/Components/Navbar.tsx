import { useAppContext } from "@/AppContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Navbar() {
    const { user, logout } = useAppContext();
    const { t } = useTranslation();
    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-20">
            <div className="container flex m-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">
                        {import.meta.env.VITE_APP_NAME}
                    </a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <button
                            className="flex items-center space-x-3 btn btn-ghost"
                            tabIndex={0}
                        >
                            <h4>{user?.name}</h4>
                        </button>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    {t("msg.profile")}
                                </Link>
                            </li>
                            <li>
                                <a onClick={logout}>{t("msg.logout")}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
