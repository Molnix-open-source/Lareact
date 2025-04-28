import { createBrowserRouter, Navigate, RouteObject } from "react-router";

import { authRoutes } from "./auth";
import AuthLayout from "@/Layouts/AuthLayout";
import Dashboard from "@/Pages/Dashboard";
import AppLayout from "@/Layouts/AppLayout";
import App from "@/App";
import NotFound from "@/Pages/NotFound";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: authRoutes,
    },
    { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter([
    {
        element: <App />,
        children: routes,
    },
]);

export default router;
