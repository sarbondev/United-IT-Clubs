import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteWorker,
  getTeamError,
  getTeamPending,
  getTeamSuccess,
} from "../toolkit/Slicer";
import { Axios } from "../middlewares/Axios";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Badge from "../components/Badge";

export const Staffs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { team } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = team;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getTeamPending());
        const response = await Axios.get("team");
        dispatch(getTeamSuccess(response.data));
      } catch (error) {
        dispatch(getTeamError());
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm("Bu xodimni o'chirib tashlamoqchimisiz?")) {
      try {
        await Axios.delete(`team/delete/${item._id}`);
        dispatch(deleteWorker(item._id));
      } catch (error) {
        console.error("Error deleting worker:", error);
        alert("Xodimni o'chirib bo'lmadi.");
      }
    }
  };

  const columns = [
    {
      header: "Xodim",
      accessor: "name",
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p className="text-sm text-slate-500">{item.job}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Lavozim",
      accessor: "job",
      render: (item) => <Badge variant="primary">{item.job}</Badge>,
    },
  ];

  return (
    <DataTable
      title="Xodimlar"
      description="Jamoa sahifasi uchun xodim ma'lumotlari va profil rasmlarini boshqaring."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/staffs/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable
      searchPlaceholder="Xodim qidirish..."
      addAction={
        <Link to="/staffs/new">
          <Button>Yangi Xodim</Button>
        </Link>
      }
    />
  );
};
