import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../shared/api/Axios";
import PageTitle from "../../../shared/components/PageTitle";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPass, setShowPass] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(`admin/${id}`);
        setFormData({ ...response.data, password: "" });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.put(`admin/update/${id}`, formData);
      navigate("/admins");
    } catch (error) {
      console.log(error);
      alert("Adminni yangilashda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-3xl">
        <div className="mb-6">
          <PageTitle>Admin Ma'lumotlarini Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Admin ma'lumotlarini yangilang
          </p>
        </div>

        <form onSubmit={submitUpdatedInfo} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="To'liq Ism"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Suhrob Rahmatullayev"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="admin@example.com"
            required
          />

          <div>
            <label className="form-label">Parol</label>
            <div className="relative">
              <input
                required
                value={formData.password || ""}
                onChange={handleInputChange}
                type={showPass ? "text" : "password"}
                placeholder="Parol kiriting"
                name="password"
                className="form-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPass ? <Eye size={18} weight="bold" /> : <EyeClosed size={18} weight="bold" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yangilanmoqda..." : "Saqlash"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admins")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAdmin;
