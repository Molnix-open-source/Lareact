import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import { pageTitle } from "@/utils/pageMeta";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { useTranslation } from "react-i18next";
import { Link, useFetcher } from "react-router";

export default function Register() {
    const fetcher = useFetcher();
    const { t } = useTranslation();
    pageTitle(t("msg.register"));

    return (
        <Card
            title={t("msg.register")}
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
                        <EnvelopeIcon className="size-20 text-blue-500" />
                    </div>
                    <h3 className=" font-bold text-2xl">
                        {t("msg.check_your_mail")}
                    </h3>
                    <p>{t("msg.verification_email_has_been_sent")}</p>
                </div>
            ) : (
                <fetcher.Form className="space-y-2" method="post">
                    <Input
                        label={t("msg.name")}
                        type="text"
                        name="name"
                        errorMessage={fetcher.data?.errors?.name}
                    />
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
                            {t("msg.register")}
                        </Button>
                    </div>
                </fetcher.Form>
            )}
        </Card>
    );
}
