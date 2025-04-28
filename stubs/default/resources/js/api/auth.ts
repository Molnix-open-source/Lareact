import apiClient from "@/utils/apiClient";
import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router";

export async function registerAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        await apiClient.post("register", formData);
        return { success: true };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err.response?.data;
        }
    }
}

export async function loginAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        await apiClient.post("login", formData);
        return { success: true };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err.response?.data;
        }
    }
}

export async function sendVerificationAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        await apiClient.post("send-email-verification", formData);
        return { success: true, email: formData.get("email") };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err.response?.data;
        }
    }
}

export async function forgotPasswordAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        await apiClient.post("forgot-password", formData);
        return { success: true, email: formData.get("email") };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err.response?.data;
        }
    }
}

export async function resetPasswordAction({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        await apiClient.post("reset-password", formData);
        return { success: true };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err.response?.data;
        }
    }
}
