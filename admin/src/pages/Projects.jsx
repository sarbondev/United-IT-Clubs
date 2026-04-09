import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProject,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from "../toolkit/Slicer";
import { Axios } from "../middlewares/Axios";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Badge from "../components/Badge";

export const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolio } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = portfolio;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getProjectsPending());
        const response = await Axios.get(`projects/?page=${page}&pageSize=${pageSize}`);
        dispatch(getProjectsSuccess(response.data.projects));
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
        dispatch(getProjectsError());
        console.log(error);
      }
    }

    getData();
  }, [dispatch, page]);

  const handleDelete = async (item) => {
    if (window.confirm(`"${item.title}" loyihasini o'chirib tashlamoqchimisiz?`)) {
      try {
        await Axios.delete(`projects/delete/${item._id}`);
        dispatch(deleteProject(item._id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Loyihani o'chirib bo'lmadi!");
      }
    }
  };

  const columns = [
    {
      header: "Loyiha",
      accessor: "title",
      render: (item) => (
        <div className="flex items-center gap-4">
          {item.images?.[0] ? (
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Portfolio entry
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Kategoriya",
      accessor: "category",
      render: (item) => <Badge variant="primary">{item.category || "Umumiy"}</Badge>,
    },
  ];

  return (
    <DataTable
      title="Loyihalar"
      description="Portfolio uchun ishlatiladigan loyihalarni sahifalab boshqaring."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/projects/edit/${item._id}`)}
      onDelete={handleDelete}
      addAction={
        <Link to="/projects/new">
          <Button>Yangi Loyiha</Button>
        </Link>
      }
      footerContent={
        !isPending && !isError && totalPages > 1 ? (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn btn-secondary"
            >
              Oldingi
            </button>
            <div className="rounded-full border border-slate-200 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-700">
              {page} / {totalPages}
            </div>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-secondary"
            >
              Keyingi
            </button>
          </div>
        ) : null
      }
    />
  );
};
