import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import FileUpload from "../../components/FileUpload";

const EditParentFeedback = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoLoading, setVideoLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    feedback: "",
    videoFile: "",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [originalVideoFile, setOriginalVideoFile] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await Axios.get(`parentFeedbacks/${id}`);
        setFormData({
          name: response.data.name || "",
          surname: response.data.surname || "",
          feedback: response.data.feedback,
          videoFile: response.data.videoFile || "",
        });
        setOriginalVideoFile(response.data.videoFile || "");
      } catch (error) {
        console.error("Error fetching parent feedback:", error);
        alert("Fikrni yuklab bo'lmadi!");
        navigate("/parentFeedbacks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoFile) {
      alert("Video faylini yuklang!");
      return;
    }
    setIsPending(true);
    try {
      await Axios.put(`parentFeedbacks/update/${id}`, formData);
      setOriginalVideoFile(formData.videoFile);
      navigate("/parentFeedbacks");
    } catch (error) {
      console.error("Error updating parent feedback:", error);
      alert("Xatolik yuz berdi!");
    } finally {
      setIsPending(false);
    }
  };

  const handleFileUpload = async (files) => {
    const file = files[0];
    if (!file) return;

    setVideoLoading(true);
    const uploadData = new FormData();
    uploadData.append("images", file);

    try {
      const { data } = await Axios.post("upload", uploadData);
      if (data.files?.length) {
        if (formData.videoFile && formData.videoFile !== originalVideoFile) {
          await Axios.post("removeFile", { file: formData.videoFile });
        }
        setFormData((prev) => ({ ...prev, videoFile: data.files[0] }));
        setVideoFile(file);
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert("Fayl yuklanmadi!");
    } finally {
      setVideoLoading(false);
    }
  };

  const handleRemoveVideo = async () => {
    if (!formData.videoFile) return;

    try {
      if (formData.videoFile !== originalVideoFile) {
        await Axios.post("removeFile", { file: formData.videoFile });
      }
    } catch (error) {
      console.error("File remove error:", error);
    } finally {
      setFormData((prev) => ({ ...prev, videoFile: "" }));
      setVideoFile(null);
    }
  };

  if (isLoading) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  return (
    <section className="page-shell">
      <div className="page-stack max-w-4xl">
        <div className="mb-6">
          <PageTitle>Ota-Ona Fikrini Tahrirlash</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Ota-ona fikrini yangilang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Ism (ixtiyoriy)"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ota-ona ismini kiriting"
          />

          <Input
            label="Familiya (ixtiyoriy)"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Ota-ona familiyasini kiriting"
          />

          <Textarea
            label="Fikr *"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Ota-ona fikrini kiriting"
            rows={4}
            required
          />

          <FileUpload
            label="Video Fayl *"
            accept="video/*"
            files={formData.videoFile ? [videoFile || formData.videoFile] : []}
            onUpload={handleFileUpload}
            onRemove={handleRemoveVideo}
            uploading={videoLoading}
            preview={false}
          />

          {formData.videoFile && !videoLoading && (
            <div className="mt-2">
              <video
                src={formData.videoFile}
                controls
                className="w-full rounded-md border border-slate-200"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPending || videoLoading}
              className={isPending || videoLoading ? "opacity-50" : ""}
            >
              {isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/parentFeedbacks")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditParentFeedback;
