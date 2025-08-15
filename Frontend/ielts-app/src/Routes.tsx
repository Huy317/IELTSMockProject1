import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestList";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminCourse from "./pages/AdminCourse";
import Settings from "./pages/Settings";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentCourses from "./pages/StudentCourses";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLayout from "./components/layout/AdminLayout";
import StudentLayout from "./components/layout/StudentLayout";
import TestListLayout from "./components/layout/TestListLayout";
import TestList from "./pages/TestList";

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
                path: "test",
                element: <TestListLayout />,
                children:[
                    {
                        path: "list",
                        element: <TestList />
                    }
                ]
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children:[
                    {
                        path: "dashboard",
                        element: <AdminDashboard />
                    },
                    {
                        path:"profile",
                        element: <AdminProfile />
                    },
                    {
                        path:"courses",
                        element: <AdminCourse />
                    },
                    {
                        path:"settings",
                        element: <Settings />
                    }
                ]
            },
            {
                path: "student",
                element: <StudentLayout />,
                children:[
                    {
                        path: "dashboard",
                        element: <StudentDashboard />
                    },
                    {
                        path:"profile",
                        element: <StudentProfile />
                    },
                    {
                        path:"courses",
                        element: <StudentCourses />
                    },
                    {
                        path:"settings",
                        element: <Settings />
                    }
                ]
            },
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