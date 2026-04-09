import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteParentFeedback,
  getParentFeedbacksError,
  getParentFeedbacksPending,
  getParentFeedbacksSuccess,
} from "../toolkit/Slicer";
import { Axios } from "../middlewares/Axios";
import DataTable from "../components/DataTable";
import Button from "../components/Button";

export const ParentFeedbacks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parentFeedbacks } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = parentFeedbacks;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getParentFeedbacksPending());
        const response = await Axios.get("parentFeedbacks/");
        dispatch(getParentFeedbacksSuccess(response.data));
      } catch (error) {
        dispatch(getParentFeedbacksError(error.response?.data?.message));
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm("Bu ota-ona fikrini o'chirib tashlamoqchimisiz?")) {
      try {
        await Axios.delete(`parentFeedbacks/delete/${item._id}`);
        dispatch(deleteParentFeedback(item._id));
      } catch (error) {
        console.error("Error deleting parent feedback:", error);
        alert("Ota-ona fikrini o'chirib bo'lmadi!");
      }
    }
  };

  const columns = [
    {
      header: "Foydalanuvchi",
      accessor: "name",
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-900">
            {item.name || "-"} {item.surname || ""}
          </p>
          <p className="text-sm text-slate-500">Parent feedback</p>
        </div>
      ),
    },
    {
      header: "Fikr",
      accessor: "feedback",
      render: (item) => (
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          {item.feedback?.length > 90
            ? `${item.feedback.slice(0, 90)}...`
            : item.feedback}
        </p>
      ),
    },
  ];

  return (
    <DataTable
      title="Ota-Ona Fikrlari"
      description="Ishonchni oshiradigan ota-ona fikrlarini saralang va keraklisini saqlang."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/parentFeedbacks/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable
      searchPlaceholder="Fikr yoki ism bo'yicha qidirish..."
      addAction={
        <Link to="/parentFeedbacks/new">
          <Button>Yangi Fikr</Button>
        </Link>
      }
    />
  );
};
