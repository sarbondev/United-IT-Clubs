import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../shared/api/Axios";
import LoadingAnimation from "../../../shared/components/LoadingAnimation";
import PageTitle from "../../../shared/components/PageTitle";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import Textarea from "../../../shared/components/Textarea";
import FileUpload from "../../../shared/components/FileUpload";

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function getDataById() {
      try {
        setIsLoading(true);
        const response = await Axios.get(`courses/${id}`);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await Axios.put(`courses/update/${id}`, formData);
      navigate("/courses");
    } catch (error) {
      console.log(error);
      alert("Kursni yangilashda xatolik!");
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

  if (isLoading) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  return (
    <section className="page-shell">
      <div className="page-stack max-w-4xl">
        <div className="mb-6">
          <PageTitle>Kurs Ma'lumotlarini Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Kurs ma'lumotlarini yangilang
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Kurs Nomi"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            placeholder="Kurs nomini kiriting"
            required
          />

          <Textarea
            label="Kurs Haqida Ma'lumot"
            name="description"
            value={formData.description || ""}
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
              {isPending ? "Yangilanmoqda..." : "Saqlash"}
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

export default EditCourse;
