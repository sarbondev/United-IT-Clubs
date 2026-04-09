import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import FileUpload from "../../components/FileUpload";

const AddCourses = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      const response = await Axios.post("upload", formImageData);
      const uploadedFile = response.data.files?.[0];
      if (!uploadedFile) throw new Error("Uploaded file URL not found");
      setFormData((prevCourse) => ({
        ...prevCourse,
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

  const addNewCourse = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.post("courses/create", formData);
      navigate("/courses");
    } catch (error) {
      console.log(error);
      alert("Kurs yaratishda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-4xl">
        <div className="mb-6">
          <PageTitle>Yangi Kurs Qo'shish</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Yangi kurs ma'lumotlarini kiriting
          </p>
        </div>

        <form onSubmit={addNewCourse} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Kurs Nomi"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Kurs nomini kiriting"
            required
          />

          <Textarea
            label="Kurs Haqida Ma'lumot"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Kurs haqida batafsil ma'lumot kiriting"
            rows={5}
            required
          />

          <FileUpload
            label="Kurs Rasmi"
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
              {isPending ? "Yaratilmoqda..." : "Kurs Yaratish"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/courses")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCourses;
