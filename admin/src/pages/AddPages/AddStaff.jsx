import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import FileUpload from "../../components/FileUpload";

const AddStaff = () => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.post("team/create", formData);
      navigate("/staffs");
    } catch (error) {
      console.log(error);
      alert("Xodim yaratishda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-3xl">
        <div className="mb-6">
          <PageTitle>Yangi Xodim Qo'shish</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Yangi xodim ma'lumotlarini kiriting
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="To'liq Ism"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Xodim ismini kiriting"
            required
          />

          <Input
            label="Lavozimi"
            name="job"
            value={formData.job}
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
              {isPending ? "Yaratilmoqda..." : "Xodim Yaratish"}
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

export default AddStaff;
