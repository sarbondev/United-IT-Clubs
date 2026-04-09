import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteService,
  getServicesError,
  getServicesPending,
  getServicesSuccess,
} from "../../../app/store/Slicer";
import { Axios } from "../../../shared/api/Axios";
import DataTable from "../../../shared/components/DataTable";
import Button from "../../../shared/components/Button";

export const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = services;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getServicesPending());
        const response = await Axios.get("services");
        dispatch(getServicesSuccess(response.data));
      } catch (error) {
        dispatch(getServicesError());
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm(`"${item.title}" xizmatini o'chirib tashlamoqchimisiz?`)) {
      try {
        await Axios.delete(`services/delete/${item._id}`);
        dispatch(deleteService(item._id));
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Xizmatni o'chirib bo'lmadi!");
      }
    }
  };

  const columns = [
    {
      header: "Xizmat",
      accessor: "title",
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Service block
          </p>
        </div>
      ),
    },
    {
      header: "Tavsif",
      accessor: "description",
      render: (item) => (
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          {item.description}
        </p>
      ),
    },
  ];

  return (
    <DataTable
      title="Xizmatlar"
      description="Asosiy sayt xizmatlar bo'limini boshqaring va har bir blokni yangilang."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/services/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable
      searchPlaceholder="Xizmat qidirish..."
      addAction={
        <Link to="/services/new">
          <Button>Yangi Xizmat</Button>
        </Link>
      }
    />
  );
};
