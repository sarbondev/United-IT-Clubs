import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../shared/api/Axios";
import PageTitle from "../../../shared/components/PageTitle";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Textarea from "../../../shared/components/Textarea";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getDataById() {
      try {
        const response = await Axios.get(`services/${id}`);
        setServiceData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const sendService = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.put(`services/update/${id}`, serviceData);
      navigate("/services");
    } catch (error) {
      console.log(error);
      alert("Xizmatni yangilashda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-3xl">
        <div className="mb-6">
          <PageTitle>Xizmat Ma'lumotlarini Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Xizmat ma'lumotlarini yangilang
          </p>
        </div>

        <form onSubmit={sendService} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Xizmat Nomi"
            name="title"
            value={serviceData.title || ""}
            onChange={handleGetValues}
            placeholder="Xizmat nomini kiriting"
            required
          />

          <Textarea
            label="Xizmat Haqida Ma'lumot"
            name="description"
            value={serviceData.description || ""}
            onChange={handleGetValues}
            placeholder="Xizmat haqida batafsil ma'lumot kiriting"
            rows={5}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Yangilanmoqda..." : "Saqlash"}
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

export default EditService;
