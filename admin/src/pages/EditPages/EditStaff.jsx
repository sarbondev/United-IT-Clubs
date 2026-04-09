import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileUpload from "../../components/FileUpload";
import LoadingAnimation from "../../components/LoadingAnimation";

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function getDataById() {
      setIsLoading(true);
      try {
        const response = await Axios.get(`team/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getDataById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.put(`team/update/${id}`, formData);
      navigate("/staffs");
    } catch (error) {
      console.log(error);
      alert("Xodimni yangilashda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  const handleFileUpload = async (files) => {
    try {
      const formImageData = new FormData();
      const file = files[0] || files.item(0);
      if (!file) return;

      formImageData.append("images", file);
      setImageLoading(true);
      const { data } = await Axios.post("upload", formImageData);
      const uploadedFile = data.files?.[0];
      if (!uploadedFile) throw new Error("Uploaded file URL not found");
      setFormData((prevWorker) => ({
        ...prevWorker,
        image: uploadedFile,
      }));
      setImageFile(file);
    } catch (err) {
      console.log(err);
      alert("Rasm yuklashda xatolik!");
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (formData.image) {
        await Axios.post("/removeFile", { image: formData.image });
      }
      setFormData((prevData) => ({ ...prevData, image: "" }));
      setImageFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  return (
    <section className="page-shell">
      <div className="page-stack max-w-3xl">
        <div className="mb-6">
          <PageTitle>Xodim Ma'lumotlarini Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Xodim ma'lumotlarini yangilang
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="To'liq Ism"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Xodim ismini kiriting"
            required
          />

          <Input
            label="Lavozimi"
            name="job"
            value={formData.job || ""}
            onChange={handleInputChange}
            placeholder="Masalan: Developer, Designer"
            required
          />

          <FileUpload
            label="Xodim Rasmi"
            accept="image/*"
            files={formData.image ? [imageFile || formData.image] : []}
            onUpload={handleFileUpload}
            onRemove={handleRemoveImage}
            uploading={imageLoading}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPending || imageLoading}
              className={isPending || imageLoading ? "opacity-50" : ""}
            >
              {isPending ? "Yangilanmoqda..." : "Saqlash"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/staffs")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStaff;
