import { LoginForm } from "@features/auth/login-form";
import { AuthLayout } from "@shared/ui";
import styles from "./login.module.scss";

export const LoginPage = () => {
  return (
    <AuthLayout formClassName={styles.form}>
      <LoginForm
        title="Welcome Back 👋"
        subtitle={
          <>
            Log in to access your projects and <br />
            bring your ideas to life
          </>
        }
        submitLabel="Log in"
        googleLabel="Log in with Google"
      />
    </AuthLayout>
  );
};
