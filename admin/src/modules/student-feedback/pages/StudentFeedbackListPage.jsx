import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteStudentFeedback,
  getStudentFeedbacksError,
  getStudentFeedbacksPending,
  getStudentFeedbacksSuccess,
} from "../../../app/store/Slicer";
import { Axios } from "../../../shared/api/Axios";
import DataTable from "../../../shared/components/DataTable";
import Button from "../../../shared/components/Button";

export const StudentFeedbacks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentFeedbacks } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = studentFeedbacks;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getStudentFeedbacksPending());
        const response = await Axios.get("studentFeedbacks/");
        dispatch(getStudentFeedbacksSuccess(response.data));
      } catch (error) {
        dispatch(getStudentFeedbacksError(error.response?.data?.message));
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm("Bu o'quvchi fikrini o'chirib tashlamoqchimisiz?")) {
      try {
        await Axios.delete(`studentFeedbacks/delete/${item._id}`);
        dispatch(deleteStudentFeedback(item._id));
      } catch (error) {
        console.error("Error deleting student feedback:", error);
        alert("O'quvchi fikrini o'chirib bo'lmadi!");
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
            {item.name} {item.surname}
          </p>
          <p className="text-sm text-slate-500">Student feedback</p>
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
      title="O'quvchi Fikrlari"
      description="Asosiy sayt uchun ishlatiladigan o'quvchi fikrlarini tahrirlang va tozalang."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/studentFeedbacks/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable
      searchPlaceholder="Fikr yoki ism bo'yicha qidirish..."
      addAction={
        <Link to="/studentFeedbacks/new">
          <Button>Yangi Fikr</Button>
        </Link>
      }
    />
  );
};
