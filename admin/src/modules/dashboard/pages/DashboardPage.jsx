import {
  ArrowRight,
  BookOpenText,
  Briefcase,
  ChatCircleText,
  Sparkle,
  UserSwitch,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "../../../shared/api/Axios";
import {
  getAdminsSuccess,
  getCoursesSuccess,
  getParentFeedbacksSuccess,
  getProjectsSuccess,
  getServicesSuccess,
  getStudentFeedbacksSuccess,
  getTeamSuccess,
} from "../../../app/store/Slicer";

const iconMap = {
  courses: BookOpenText,
  projects: Briefcase,
  services: Wrench,
  team: UsersThree,
  admins: UserSwitch,
  feedbacks: ChatCircleText,
};

const StatCard = ({ label, value, accent, icon, href, hint }) => {
  const Icon = icon;

  return (
    <Link
      to={href}
      className="section-card group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1"
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="display-title mt-4 text-4xl font-bold text-slate-950">
            {value}
          </p>
        </div>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-3xl text-white shadow-lg"
          style={{ background: accent }}
        >
          <Icon size={26} weight="duotone" />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between text-sm">
        <span className="text-slate-500">{hint}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
          Ko'rish <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    admins,
    courses,
    portfolio,
    services,
    team,
    studentFeedbacks,
    parentFeedbacks,
  } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          coursesRes,
          projectsRes,
          servicesRes,
          teamRes,
          adminsRes,
          studentRes,
          parentRes,
        ] = await Promise.all([
          Axios.get("courses/"),
          Axios.get("projects/?page=1&pageSize=6"),
          Axios.get("services/"),
          Axios.get("team"),
          Axios.get("admin/"),
          Axios.get("studentFeedbacks/"),
          Axios.get("parentFeedbacks/"),
        ]);

        dispatch(getCoursesSuccess(coursesRes.data));
        dispatch(getProjectsSuccess(projectsRes.data.projects));
        dispatch(getServicesSuccess(servicesRes.data));
        dispatch(getTeamSuccess(teamRes.data));
        dispatch(getAdminsSuccess(adminsRes.data));
        dispatch(getStudentFeedbacksSuccess(studentRes.data));
        dispatch(getParentFeedbacksSuccess(parentRes.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  const stats = [
    {
      label: "Kurslar",
      value: courses.data.length,
      icon: iconMap.courses,
      accent: "linear-gradient(135deg, #ef7d32 0%, #ffae66 100%)",
      href: "/courses",
      hint: "O'quv dasturlari katalogi",
    },
    {
      label: "Loyihalar",
      value: portfolio.data.length,
      icon: iconMap.projects,
      accent: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
      href: "/projects",
      hint: "Portfolio showcase elementlari",
    },
    {
      label: "Xizmatlar",
      value: services.data.length,
      icon: iconMap.services,
      accent: "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)",
      href: "/services",
      hint: "Commercial service takliflari",
    },
    {
      label: "Xodimlar",
      value: team.data.length,
      icon: iconMap.team,
      accent: "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)",
      href: "/staffs",
      hint: "Jamoa profillari va rollari",
    },
  ];

  const activity = [
    {
      label: "Feedbacklar",
      value: studentFeedbacks.data.length + parentFeedbacks.data.length,
      note: "Jami kelib tushgan fikrlar",
    },
    {
      label: "Adminlar",
      value: admins.data.length,
      note: "Tizimga kirish huquqiga ega foydalanuvchilar",
    },
    {
      label: "Kontent bloklari",
      value: courses.data.length + portfolio.data.length + services.data.length,
      note: "Asosiy sayt uchun aktiv kontent birliklari",
    },
  ];

  return (
    <section className="page-shell">
      <div className="page-stack">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <div className="section-card-dark relative overflow-hidden p-8 md:p-10  rounded-3xl">
            <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-primary-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="relative max-w-2xl">
              <div className="eyebrow !bg-white/10 !text-primary-100">
                <Sparkle size={14} weight="fill" />
                Boshqaruv markazi
              </div>
              <h2 className="display-title mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Kontentni nazorat qiling, jamoani boshqaring va admin ilovani
                premium darajaga olib chiqing.
              </h2>
              <p className="mt-4 max-w-xl text-base text-slate-300">
                Yangi dizayn tezkor ko'rish, aniq prioritetlar va kundalik
                operatsiyalar uchun qurildi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/courses/new" className="btn btn-primary">
                  Yangi kurs
                </Link>
                <Link
                  to="/projects"
                  className="btn border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  Portfolio ko'rish
                </Link>
              </div>
            </div>
          </div>

          <div className="section-card p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Operatsion Snapshot
            </p>
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-slate-200/80 bg-white/75 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </p>
                    <p className="display-title text-3xl font-bold text-slate-950">
                      {item.value}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
