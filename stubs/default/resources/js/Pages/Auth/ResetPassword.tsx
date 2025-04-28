import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import { pageTitle } from "@/utils/pageMeta";
import { KeyIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Link,
    useFetcher,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router";

export default function ResetPassword() {
    const fetcher = useFetcher();
    const params = useParams();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    pageTitle(t("msg.change_password"));
    useEffect(() => {
        if (!searchParams.get("email")) {
            navigate("/auth/forgot-password");
        }
    }, []);

    return (
        <Card
            title={t("msg.change_password")}
            footer={
                <div className="text-center">
                    <Link to="/auth/login" className="link link-hover">
                        {t("msg.login_here")}
                    </Link>
                </div>
            }
        >
            {fetcher.state == "idle" && fetcher?.data?.success == true ? (
                <div className="flex flex-col items-center space-y-3">
                    <div>
                        <KeyIcon className="size-20 text-blue-500" />
                    </div>
                    <h3 className=" font-bold text-2xl">
                        {t("msg.password_has_been_changed")}
                    </h3>
                </div>
            ) : (
                <fetcher.Form className="space-y-2" method="post">
                    <input
                        type="hidden"
                        defaultValue={params.token}
                        name="token"
                    />
                    <Input
                        label={t("msg.email")}
                        type="email"
                        name="email"
                        readOnly
                        defaultValue={searchParams.get("email")}
                        errorMessage={fetcher.data?.errors?.email}
                    />

                    <Input
                        label={t("msg.password")}
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        errorMessage={fetcher.data?.errors?.password}
                    />

                    <Input
                        label={t("msg.confirm_password")}
                        type="password"
                        autoComplete="new-password"
                        name="password_confirmation"
                        errorMessage={
                            fetcher.data?.errors?.password_confirmation
                        }
                    />
                    <div className="pt-3 flex justify-end">
                        <Button loading={fetcher.state != "idle"} type="submit">
                            {t("msg.change_password")}
                        </Button>
                    </div>
                </fetcher.Form>
            )}
        </Card>
    );
}
