import { Navigate } from "react-router-dom";
import { tokenStorage } from "./token-storage";
import { ROUTES } from "@shared/config/routes";
import type { ReactElement } from "react";

interface ProtectedRouteProps {
  children: ReactElement;
}

interface PublicRouteProps {
  children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = tokenStorage.getToken();
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = tokenStorage.getToken();
  if (token) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return children;
};
