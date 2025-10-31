import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "@pages/register";
import { HomePage } from "@pages/home";
import { ProtectedRoute, PublicRoute } from "@shared/lib/protected-route";
import { LoginPage } from "@pages/login";
import { ROUTES } from "@shared/config/routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
