import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import AdminPage from "./pages/Adminpage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>Page not found</div>,
        children: [
            {   
                index: true,
                element: <HomePage />
            },
            {
                path: "course-grid",
                element: <TestPage/>
            }
        ]
    },
    {
        path: "admin",
        element: <AdminPage />
        
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "register",
        element: <RegisterPage />
    }

]);

export default function Routes() {
    return <RouterProvider router={router} />;
}