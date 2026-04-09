import { Eye, EyeClosed, Lock, EnvelopeSimple, Sparkle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Axios } from "../../../shared/api/Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsPending(true);
      const response = await Axios.post("admin/login", formData);
      localStorage.setItem("uitctoken", response.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Tizimga kirishda xatolik yuz berdi.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,125,50,0.22),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(22,163,74,0.08),_transparent_20%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-7xl overflow-hidden rounded-[36px] border border-white/50 bg-white/55 shadow-soft-lg backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="section-card-dark relative hidden overflow-hidden border-0 rounded-none p-10 lg:block lg:p-14">
          <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-primary-500/25 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative z-10 flex h-full max-w-xl flex-col justify-between">
            <div>
              <div className="eyebrow !bg-white/10 !text-primary-100">
                <Sparkle size={14} weight="fill" />
                United IT Clubs
              </div>
              <h1 className="display-title mt-6 text-5xl font-bold leading-tight text-white">
                Admin ilovangiz uchun yanada kuchli, fokuslangan boshqaruv maydoni.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                Kontent, team, feedback va portfolio oqimlarini bitta aniq vizual
                tizimga jamlaydigan premium admin tajribasi.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Kontentni tez yangilash"],
                ["02", "Feedbacklarni nazorat qilish"],
                ["03", "Admin jarayonlarini soddalashtirish"],
              ].map(([id, label]) => (
                <div
                  key={id}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold text-primary-100">{id}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="eyebrow">Admin Login</div>
              <h2 className="display-title mt-4 text-4xl font-bold text-slate-950">
                Tizimga kiring
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Admin panelga kirish uchun email va parolingizni kiriting.
              </p>
            </div>

            <div className="section-card p-6 sm:p-8">
              {error && (
                <div className="mb-6 rounded-[22px] border border-orange-200 bg-orange-50 px-4 py-4 text-sm font-medium text-orange-800">
                  {error}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="relative">
                    <EnvelopeSimple
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@uitc.uz"
                      className="form-input pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="form-label">
                    Parol
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="password"
                      name="password"
                      required
                      type={showPass ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Parolni kiriting"
                      className="form-input pl-11 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPass ? <Eye size={18} /> : <EyeClosed size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isPending} className="btn btn-primary w-full">
                  {isPending ? "Kirilmoqda..." : "Kirish"}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs uppercase tracking-[0.22em] text-slate-500">
              UITC Admin Panel 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
