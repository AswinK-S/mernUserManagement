import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateAdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/profile" />
    )
  ) : (
    <Navigate to="/sign-in" />
  );
}

export default PrivateAdminRoute;
