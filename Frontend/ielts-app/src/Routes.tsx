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

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import LoginPageFinal from "./pages/TestLoginFinal";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import TestDetail from "./pages/TestDetail";

import { AdminTypeSkill } from "./pages/AdminTypeSkill";

import EditReadingTest from "./components/test_rework/EditReadingTest";

import NewListeningTestPage from "./components/test_rework/test_pages/NewListeningTestPage";
import ReadingPage from "./components/test_rework/test_pages/ReadingPage";


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
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "test/:id",
        element: (
          <ProtectedRoute allowedRoles={["Student", "Admin"]}>
            <TestDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-test/:id",
        element: <ProtectedRoute requiredRole="Admin">
          <EditReadingTest />
        </ProtectedRoute>,
      },
      {
        path: "admin",
        // element: <AdminLayout />,
        element: (
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
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
          {
            path: "type-skill",
            element: <AdminTypeSkill />,
          },
        ],
      },
      {
        path: "student",
        // element: <StudentLayout />, for student UI allow both admin and student to access for convienience
        element: (
          <ProtectedRoute allowedRoles={["Student", "Admin"]}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "profile/:userId",
            element: <StudentProfile />,
          },
          {
            path: "profile",
            element: <StudentProfile />,
          },
          {
            path: "courses",
            element: <StudentCourses />,
          },
          {
            path: "settings/:userId",
            element: <Settings />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPageFinal />,
    // element: <LoginPage />,
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
  {
    path: "unauthorized",
    element: <div>Unauthorized Access</div>,
  },
  {
    path: "new-listening-test",
    element: <NewListeningTestPage />,
  },
  {
    path: "reading-test/:id",
    element: <ReadingPage/>
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
