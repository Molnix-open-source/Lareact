import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import { pageTitle } from "@/utils/pageMeta";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useFetcher, useNavigate } from "react-router";

export default function Login() {
    const { t } = useTranslation();
    pageTitle(t("msg.login"));
    const fetcher = useFetcher();
    const navigate = useNavigate();

    useEffect(() => {
        if (fetcher.state == "idle" && fetcher?.data?.success == true) {
            navigate("/dashboard");
        }
    }, [fetcher]);
    return (
        <Card
            title={t("msg.welcome")}
            footer={
                <div className="text-center flex flex-col">
                    <Link to="/auth/register" className="link link-hover">
                        {t("msg.no_account_register_here")}
                    </Link>
                    <Link to="/auth/verification" className="link link-hover">
                        {t("msg.resetn_verification_code")}
                    </Link>
                </div>
            }
        >
            <fetcher.Form className="space-y-2" method="post">
                <Input
                    label={t("msg.email")}
                    type="email"
                    name="email"
                    errorMessage={fetcher.data?.errors?.email}
                />
                <Input
                    label={t("msg.password")}
                    type="password"
                    name="password"
                    errorMessage={fetcher.data?.errors?.password}
                />

                <div className="flex justify-between">
                    <label className="fieldset-label">
                        <input
                            type="checkbox"
                            name="remember"
                            className="checkbox"
                            value="true"
                        />
                        {t("msg.remember_me")}
                    </label>
                    <Link
                        to="/auth/forgot-password"
                        className="link link-hover"
                    >
                        {t("msg.forgot_password")}?
                    </Link>
                </div>
                <div className="pt-3 flex justify-end">
                    <Button loading={fetcher.state != "idle"} type="submit">
                        {t("msg.login")}
                    </Button>
                </div>
            </fetcher.Form>
        </Card>
    );
}
