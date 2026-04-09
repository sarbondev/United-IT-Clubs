import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import FileUpload from "../../components/FileUpload";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    async function getDataById() {
      try {
        setIsLoading(true);
        const response = await Axios.get(`projects/${id}`);
        setFormData(response.data);
        if (response.data.images?.length) {
          setImageFiles(response.data.images);
        }
      } catch (error) {
        console.log(error);
        alert("Loyihani yuklashda xatolik!");
        navigate("/projects");
      } finally {
        setIsLoading(false);
      }
    }
    getDataById();
  }, [id, navigate]);

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
      await Axios.put(`projects/update/${id}`, formData);
      navigate("/projects");
    } catch (error) {
      console.log(error);
      alert("Loyihani yangilashda xatolik!");
    } finally {
      setIsPending(false);
    }
  };

  const handleFileUpload = async (files) => {
    try {
      const formImageData = new FormData();
      for (const file of files) {
        formImageData.append("images", file);
      }

      setImageLoading(true);
      const { data } = await Axios.post("upload", formImageData);
      const uploadedFiles = data.files || [];
      if (!Array.isArray(uploadedFiles)) {
        throw new Error("Uploaded files list not found");
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedFiles],
      }));
      setImageFiles((prev) => [...prev, ...Array.from(files)]);
    } catch (err) {
      console.log(err);
      alert("Rasm yuklashda xatolik!");
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = async (index) => {
    try {
      const imageUrl = formData.images[index];
      if (imageUrl) {
        await Axios.post("/removeFile", { image: imageUrl });
      }
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const categoryOptions = [
    { value: "web", label: "Web Development", icon: "\uD83C\uDF10" },
    { value: "modeling", label: "3D Modeling", icon: "\uD83C\uDFA8" },
    { value: "design", label: "Design", icon: "\u2728" },
    { value: "AI", label: "Artificial Intelligence", icon: "\uD83E\uDD16" },
  ];

  if (isLoading) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  return (
    <section className="page-shell">
      <div className="page-stack max-w-4xl">
        <div className="mb-6">
          <PageTitle>Loyihani Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Loyiha ma'lumotlarini yangilang
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Loyiha Nomi"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            placeholder="Loyiha nomini kiriting"
            required
          />

          <Textarea
            label="Loyiha Haqida Ma'lumot"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            placeholder="Loyiha haqida batafsil ma'lumot kiriting"
            rows={5}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Loyiha Kategoriyasi"
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
              options={categoryOptions}
              placeholder="Kategoriya tanlang"
            />

            <Input
              label="Loyiha Havolasi"
              name="url"
              type="text"
              value={formData.url || ""}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />
          </div>

          <FileUpload
            label="Loyiha Rasmlari"
            accept="image/*"
            multiple
            files={imageFiles.length ? imageFiles : formData.images}
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
              onClick={() => navigate("/projects")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
