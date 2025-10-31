import { Button, EverypixelLogo } from "@shared/ui";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@features/auth/api";
import { useEffect } from "react";
import styles from "./home.module.scss";
import { tokenStorage } from "@shared/lib/token-storage";

export const HomePage = () => {
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLogoutMutation();

  const userEmail = tokenStorage.getUserEmail();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="wrapper">
      <main>
        <span className={styles.logo}>
          <EverypixelLogo />
        </span>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h1>Welcome, {userEmail || "user"}!</h1>
            <Button
              variant="primary"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
