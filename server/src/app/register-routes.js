import adminRoutes from "../modules/admin/admin.routes.js";
import courseRoutes from "../modules/course/course.routes.js";
import parentFeedbackRoutes from "../modules/parent-feedback/parent-feedback.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import serviceRoutes from "../modules/service/service.routes.js";
import studentFeedbackRoutes from "../modules/student-feedback/student-feedback.routes.js";
import teamRoutes from "../modules/team/team.routes.js";

export function registerRoutes(app) {
  app.get("/", (_, res) => res.send("Welcome home route!"));
  app.use("/api/services", serviceRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/team", teamRoutes);
  app.use("/api/studentFeedbacks", studentFeedbackRoutes);
  app.use("/api/parentFeedbacks", parentFeedbackRoutes);
}
