import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "@pages/register";
import { HomePage } from "@pages/home";
import { ProtectedRoute, PublicRoute } from "@shared/lib/protected-route";
import { LoginPage } from "@pages/login";
import { useEffect } from "react";
import { useAppDispatch } from "./store";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
