import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import { pageTitle } from "@/utils/pageMeta";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link, useFetcher } from "react-router";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    pageTitle(t("msg.forgot_password"));

    return (
        <Card
            title={t("msg.forgot_password")}
            footer={
                <div className="text-center flex flex-col">
                    <Link to="/auth/login" className="link link-hover">
                        {t("msg.login_here")}
                    </Link>
                </div>
            }
        >
            {fetcher.state == "idle" && fetcher?.data?.success == true ? (
                <div className="flex flex-col items-center space-y-3">
                    <div>
                        <EnvelopeIcon className="size-20 text-blue-500" />
                    </div>
                    <h3 className=" font-bold text-2xl">
                        {t("msg.check_your_mail")}
                    </h3>
                    <p>{t("msg.password_reset_email_has_been_sent")}</p>
                </div>
            ) : (
                <fetcher.Form className="space-y-2" method="post">
                    <Input
                        label={t("msg.email")}
                        type="email"
                        name="email"
                        errorMessage={fetcher.data?.errors?.email}
                    />

                    <div className="pt-3 flex justify-end">
                        <Button loading={fetcher.state != "idle"} type="submit">
                            {t("msg.send")}
                        </Button>
                    </div>
                </fetcher.Form>
            )}
        </Card>
    );
}
