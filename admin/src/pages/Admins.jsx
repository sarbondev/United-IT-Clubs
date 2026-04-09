import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../toolkit/Slicer";
import { Axios } from "../middlewares/Axios";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import Badge from "../components/Badge";

export const Admins = () => {
  const { admins } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isPending } = admins;

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getAdminsPending());
        const response = (await Axios.get("admin/")).data;
        dispatch(getAdminsSuccess(response));
      } catch (err) {
        dispatch(getAdminsError());
        console.log(err);
      }
    }
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    if (window.confirm(`Haqiqatan ham o'chirib tashlamoqchimisiz: ${item.name}?`)) {
      try {
        await Axios.delete(`admin/delete/${item._id}`);
        dispatch(getAdminsSuccess(data.filter((admin) => admin._id !== item._id)));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = [
    {
      header: "Admin",
      accessor: "name",
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-900">{item.name}</p>
          <p className="text-sm text-slate-500">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Rol",
      accessor: "email",
      render: () => <Badge variant="neutral">Super Admin</Badge>,
    },
  ];

  return (
    <DataTable
      title="Adminlar"
      description="Admin akkauntlarini boshqaring va tizimga kirish nazoratini kuzating."
      columns={columns}
      data={data}
      isPending={isPending}
      isError={isError}
      onEdit={(item) => navigate(`/admins/edit/${item._id}`)}
      onDelete={handleDelete}
      searchable
      searchPlaceholder="Admin qidirish..."
      addAction={
        <Link to="/admins/new">
          <Button>Yangi Admin</Button>
        </Link>
      }
    />
  );
};
