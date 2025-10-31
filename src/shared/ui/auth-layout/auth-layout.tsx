import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { EverypixelLogo } from "@shared/ui";
import { ROUTES } from "@shared/config/routes";
import styles from "./auth-layout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
  formClassName?: string;
}

export const AuthLayout = ({ children, formClassName }: AuthLayoutProps) => {
  return (
    <div className="wrapper">
      <main>
        <h1 className="visually-hidden">Sign Up form</h1>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <EverypixelLogo />
        </Link>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <div className={formClassName}>{children}</div>
              <div className={styles.imageContainer}>
                <img
                  src="/bg.png"
                  srcSet="/bg.png 1x, /bg2x.png 2x"
                  alt="Login illustration"
                  width="1094"
                  height="1040"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
