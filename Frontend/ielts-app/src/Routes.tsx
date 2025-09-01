import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
import AdminUserList from "./pages/AdminUserList";
import CategoryLayout from "./components/layout/CategoriesLayout";
import TestList from "./pages/TestList";
import ForgotPassword from "./pages/ForgotPassword";
import AddListeningTest from "./pages/AddListeningTest";
import AddReadingTest from "./pages/AddReadingTest";
import ReadingTestPage from "./pages/ReadingTestPage";
import ListeningTestPage from "./pages/ListeningTestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "test",
        element: <CategoryLayout />,
        children: [
          {
            path: "list",
            element: <TestList />,
          },
        ],
      },
      {
        path: "createlisteningtest",
        element: <AddListeningTest />,
      },
      {
        path: "createreadingtest",
        element: <AddReadingTest />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "courses",
            element: <AdminCourse />,
          },
          {
            path: "users",
            element: <AdminUserList />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "profile",
            element: <StudentProfile />,
          },
          {
            path: "courses",
            element: <StudentCourses />,
          },
          // {
          //   path: "settings",
          //   element: <Settings />,
          // },
          {
            path: "settings/:userId",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reading",
    element: <ReadingTestPage />,
  },
  {
    path: "listening",
    element: <ListeningTestPage />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
