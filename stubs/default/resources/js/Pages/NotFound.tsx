import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center flex-1 items-center">
            <div className="flex flex-col space-y-2">
                <div className=" font-bold text-9xl opacity-50">404</div>
                <div className=" font-bold text-2xl">
                    {t("msg.page_not_found")}
                </div>
                <Link to="/" className=" font-bold">
                    {t("msg.go_home")}
                </Link>
            </div>
        </div>
    );
}
