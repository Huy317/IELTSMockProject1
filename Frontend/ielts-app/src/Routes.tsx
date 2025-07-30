import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import TestPage from "./pages/TestPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Page not found</div>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "test",
                element: <TestPage/>
            }
        ]
    }
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}