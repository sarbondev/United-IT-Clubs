import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./app/router";
import { Axios } from "./shared/api/Axios";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
} from "./app/store/UserSlicer";
import LoadingAnimation from "./shared/components/LoadingAnimation";

function App() {
  const { isAuth, isPending } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUserPending());
        const response = await Axios.get("admin/me");
        dispatch(getUserSuccess(response.data));
      } catch (error) {
        dispatch(getUserError(""));
      }
    };
    fetchData();
  }, [dispatch]);

  if (isPending) {
    return <LoadingAnimation>Sahifa yuklanmoqda</LoadingAnimation>;
  }

  const router = createAppRouter(isAuth);

  return <RouterProvider router={router} />;
}

export default App;
