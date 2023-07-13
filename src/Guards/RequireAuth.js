import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useContext(UserContext);

  return allowedRoles?.includes(user.role) ? (
    <Outlet />
  ) : user.loggedIn ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
