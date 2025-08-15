import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import AdminPage from "./pages/Adminpage";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboardLayout from "./components/layout/AdminDashboardLayout";

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
            },
            {
                path: "admin",
                element: <AdminDashboardLayout />,
                children:[
                    {
                        path: "dashboard",
                        element: <AdminPage />
                    },
                    {
                        path:"profile",
                        element: <div>Admin Profile. Change this to the actual page component</div>
                    },
                    {
                        path:"courses",
                        element: <div>Admin Courses. Change this to the actual page component</div>
                    }
                ]
            }
        ]
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