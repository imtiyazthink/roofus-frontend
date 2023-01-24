import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuth = useSelector((state: any) => state.auth.isLogin);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
