import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

const AddServices = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
  });

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const sendService = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.post("services/create", serviceData);
      navigate("/services");
    } catch (error) {
      console.log(error);
      alert("Xizmat yaratishda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-3xl">
        <div className="mb-6">
          <PageTitle>Yangi Xizmat Qo'shish</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Yangi xizmat ma'lumotlarini kiriting
          </p>
        </div>

        <form onSubmit={sendService} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Xizmat Nomi"
            name="title"
            value={serviceData.title}
            onChange={handleGetValues}
            placeholder="Xizmat nomini kiriting"
            required
          />

          <Textarea
            label="Xizmat Haqida Ma'lumot"
            name="description"
            value={serviceData.description}
            onChange={handleGetValues}
            placeholder="Xizmat haqida batafsil ma'lumot kiriting"
            rows={5}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yaratilmoqda..." : "Xizmat Yaratish"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/services")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddServices;
