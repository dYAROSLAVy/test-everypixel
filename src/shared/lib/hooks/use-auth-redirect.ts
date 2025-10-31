import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";

export const useAuthRedirect = (isSuccess: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isSuccess, navigate]);
};
