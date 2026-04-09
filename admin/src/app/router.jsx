import { Navigate, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../shared/layout/RootLayout";
import AddAdmin from "../modules/admin/pages/AddAdminPage";
import { Admins } from "../modules/admin/pages/AdminListPage";
import EditAdmin from "../modules/admin/pages/EditAdminPage";
import Login from "../modules/auth/pages/LoginPage";
import AddCoursePage from "../modules/course/pages/AddCoursePage";
import { Courses } from "../modules/course/pages/CourseListPage";
import EditCoursePage from "../modules/course/pages/EditCoursePage";
import { Dashboard } from "../modules/dashboard/pages/DashboardPage";
import AddParentFeedbackPage from "../modules/parent-feedback/pages/AddParentFeedbackPage";
import EditParentFeedbackPage from "../modules/parent-feedback/pages/EditParentFeedbackPage";
import { ParentFeedbacks } from "../modules/parent-feedback/pages/ParentFeedbackListPage";
import AddProjectPage from "../modules/project/pages/AddProjectPage";
import EditProjectPage from "../modules/project/pages/EditProjectPage";
import { Projects } from "../modules/project/pages/ProjectListPage";
import AddServicePage from "../modules/service/pages/AddServicePage";
import EditServicePage from "../modules/service/pages/EditServicePage";
import { Services } from "../modules/service/pages/ServiceListPage";
import AddStudentFeedbackPage from "../modules/student-feedback/pages/AddStudentFeedbackPage";
import EditStudentFeedbackPage from "../modules/student-feedback/pages/EditStudentFeedbackPage";
import { StudentFeedbacks } from "../modules/student-feedback/pages/StudentFeedbackListPage";
import AddTeamMemberPage from "../modules/team/pages/AddTeamMemberPage";
import EditTeamMemberPage from "../modules/team/pages/EditTeamMemberPage";
import { Staffs } from "../modules/team/pages/TeamListPage";
import NotFound from "../pages/NotFoundPage";

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
        element: <AddCoursePage />,
      },
      {
        path: "projects/new",
        element: <AddProjectPage />,
      },
      {
        path: "services/new",
        element: <AddServicePage />,
      },
      {
        path: "staffs/new",
        element: <AddTeamMemberPage />,
      },
      {
        path: "studentFeedbacks/new",
        element: <AddStudentFeedbackPage />,
      },
      {
        path: "parentFeedbacks/new",
        element: <AddParentFeedbackPage />,
      },
      {
        path: "admins/edit/:id",
        element: <EditAdmin />,
      },
      {
        path: "courses/edit/:id",
        element: <EditCoursePage />,
      },
      {
        path: "projects/edit/:id",
        element: <EditProjectPage />,
      },
      {
        path: "services/edit/:id",
        element: <EditServicePage />,
      },
      {
        path: "staffs/edit/:id",
        element: <EditTeamMemberPage />,
      },
      {
        path: "studentFeedbacks/edit/:id",
        element: <EditStudentFeedbackPage />,
      },
      {
        path: "parentFeedbacks/edit/:id",
        element: <EditParentFeedbackPage />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "*", element: <NotFound /> },
];

export function createAppRouter(isAuth) {
  return createBrowserRouter(isAuth ? privateRoutes : publicRoutes);
}
