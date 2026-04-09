import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../middlewares/Axios";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import FileUpload from "../../components/FileUpload";

const AddStudentFeedback = () => {
  const navigate = useNavigate();
  const [videoLoading, setVideoLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    feedback: "",
    videoFile: "",
  });
  const [videoFile, setVideoFile] = useState(null);

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
      await Axios.post("studentFeedbacks/create", formData);
      navigate("/studentFeedbacks");
    } catch (error) {
      console.error("Error adding student feedback:", error);
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
        if (formData.videoFile) {
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
      await Axios.post("removeFile", { file: formData.videoFile });
    } catch (error) {
      console.error("File remove error:", error);
    } finally {
      setFormData((prev) => ({ ...prev, videoFile: "" }));
      setVideoFile(null);
    }
  };

  return (
    <section className="page-shell">
      <div className="page-stack max-w-4xl">
        <div className="mb-6">
          <PageTitle>Yangi O'quvchi Fikri Qo'shish</PageTitle>
          <p className="text-sm text-slate-500 mt-1">
            Yangi o'quvchi fikrini kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="section-card space-y-6 p-6 md:p-8">
          <Input
            label="Ism *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="O'quvchi ismini kiriting"
            required
          />

          <Input
            label="Familiya *"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="O'quvchi familiyasini kiriting"
            required
          />

          <Textarea
            label="Fikr *"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="O'quvchi fikrini kiriting"
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
              onClick={() => navigate("/studentFeedbacks")}
            >
              Bekor qilish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudentFeedback;
