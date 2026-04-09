import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCourse,
  getCoursesError,
  getCoursesPending,
  getCoursesSuccess,
} from "../toolkit/Slicer";
import { Axios } from "../middlewares/Axios";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Badge from "../components/Badge";

export const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = courses;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getCoursesPending());
        const response = await Axios.get("courses/");
        dispatch(getCoursesSuccess(response.data));
      } catch (error) {
        dispatch(getCoursesError(error.response?.data?.message));
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm(`"${item.title}" kursini o'chirib tashlamoqchimisiz?`)) {
      try {
        await Axios.delete("courses/delete/" + item._id);
        dispatch(deleteCourse(item._id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Kursni o'chirib bo'lmadi!");
      }
    }
  };

  const columns = [
    {
      header: "Nomi",
      accessor: "title",
      render: (item) => (
        <span className="font-medium text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Rasm",
      accessor: "image",
      render: (item) => (
        <div className="flex justify-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-12 object-cover rounded-md border border-slate-200 shadow-sm"
            />
          ) : (
            <div className="w-16 h-12 bg-slate-100 rounded-md flex items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Kurslar"
      description="Kurs kartalari, preview rasmlari va o'quv dasturlarini bir joydan boshqaring."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => (window.location.href = `/courses/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable={true}
      searchPlaceholder="Kurs qidirish..."
      addAction={
        <Link to="/courses/new">
          <Button>Yangi Kurs</Button>
        </Link>
      }
    />
  );
};
