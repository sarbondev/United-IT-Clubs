import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import AddCourses from "./pages/AddPages/AddCourses";
import AddProject from "./pages/AddPages/AddProjects";
import AddServices from "./pages/AddPages/AddServices";
import AddStaff from "./pages/AddPages/AddStaff";
import AddStudentFeedback from "./pages/AddPages/AddStudentFeedback";
import AddParentFeedback from "./pages/AddPages/AddParentFeedback";
import { Admins } from "./pages/Admins";
import { Courses } from "./pages/Courses";
import EditAdmin from "./pages/EditPages/EditAdmin";
import EditCourse from "./pages/EditPages/EditCourse";
import EditProject from "./pages/EditPages/EditProject";
import EditService from "./pages/EditPages/EditServices";
import EditStaff from "./pages/EditPages/EditStaff";
import EditStudentFeedback from "./pages/EditPages/EditStudentFeedback";
import EditParentFeedback from "./pages/EditPages/EditParentFeedback";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Services } from "./pages/Services";
import { Staffs } from "./pages/Staffs";
import { StudentFeedbacks } from "./pages/StudentFeedbacks";
import { ParentFeedbacks } from "./pages/ParentFeedbacks";
import { Axios } from "./middlewares/Axios";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
} from "./toolkit/UserSlicer";
import LoadingAnimation from "./components/LoadingAnimation";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const { isAuth, isPending } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserPending());
        const response = await Axios.get("admin/me");
        dispatch(getUserSuccess(response.data));
      } catch (error) {
        dispatch(getUserError(""));
      }
    };
    fetchData();
  }, [dispatch]);

  if (isPending) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  const privateRoutes = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "admins",
          element: <Admins />,
        },
        {
          path: "staffs",
          element: <Staffs />,
        },
        {
          path: "studentFeedbacks",
          element: <StudentFeedbacks />,
        },
        {
          path: "parentFeedbacks",
          element: <ParentFeedbacks />,
        },
        {
          path: "admins/new",
          element: <AddAdmin />,
        },
        {
          path: "courses/new",
          element: <AddCourses />,
        },
        {
          path: "projects/new",
          element: <AddProject />,
        },
        {
          path: "services/new",
          element: <AddServices />,
        },
        {
          path: "staffs/new",
          element: <AddStaff />,
        },
        {
          path: "studentFeedbacks/new",
          element: <AddStudentFeedback />,
        },
        {
          path: "parentFeedbacks/new",
          element: <AddParentFeedback />,
        },
        {
          path: "admins/edit/:id",
          element: <EditAdmin />,
        },
        {
          path: "courses/edit/:id",
          element: <EditCourse />,
        },
        {
          path: "projects/edit/:id",
          element: <EditProject />,
        },
        {
          path: "services/edit/:id",
          element: <EditService />,
        },
        {
          path: "staffs/edit/:id",
          element: <EditStaff />,
        },
        {
          path: "studentFeedbacks/edit/:id",
          element: <EditStudentFeedback />,
        },
        {
          path: "parentFeedbacks/edit/:id",
          element: <EditParentFeedback />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const publicRoutes = [
    { path: "/", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ];

  const router = createBrowserRouter(isAuth ? privateRoutes : publicRoutes);

  return <RouterProvider router={router} />;
}

export default App;
