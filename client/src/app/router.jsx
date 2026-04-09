import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../shared/layouts/RootLayout";
import { Home } from "../pages/public/Home";
import { ProjectDetail } from "../pages/public/ProjectDetail";
import { CoursesPage } from "../pages/public/CoursesPage";
import { ServicesPage } from "../pages/public/ServicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: ":id",
        element: <ProjectDetail />,
      },
    ],
  },
]);
