import React, { useContext } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext.tsx";
import { Outlet, Navigate } from "react-router-dom";
import { Role } from "../models/domain/Role.ts";

interface Props {
  allowedRoles: Role[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const { loggedIn, user } = useContext(UserContext) as UserContextType;

  //TODO FIX THIS BULLSHIT
  if (allowedRoles.length == 0 && !loggedIn) return <Outlet />;

  if (user === null) {
    return <Navigate to="/login" />
  }

  return allowedRoles?.includes(user!.role) ? (
    <Outlet />
  ) : loggedIn ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
