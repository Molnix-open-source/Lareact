import {
    forgotPasswordAction,
    loginAction,
    registerAction,
    resetPasswordAction,
    sendVerificationAction,
} from "@/api/auth";
import ForgotPassword from "@/Pages/Auth/ForgotPassword";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import ResetPassword from "@/Pages/Auth/ResetPassword";
import Verification from "@/Pages/Auth/Verification";

import { Navigate, RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
    { index: true, element: <Navigate to="login" replace /> },
    {
        path: "login",
        element: <Login />,
        action: loginAction,
    },
    { path: "register", element: <Register />, action: registerAction },
    {
        path: "verification",
        element: <Verification />,
        action: sendVerificationAction,
    },
    {
        path: "forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
    },
    {
        path: "reset-password/:token",
        element: <ResetPassword />,
        action: resetPasswordAction,
    },
];
