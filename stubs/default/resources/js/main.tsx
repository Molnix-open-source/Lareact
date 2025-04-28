//lareact
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes";
import "./i18n";

createRoot(document.body).render(<RouterProvider router={router} />);
