import { AuthLayout } from "@shared/ui";
import styles from "./register.module.scss";
import { RegisterForm } from "@features/auth/register-form/ui/register-form";

export const RegisterPage = () => {
  return (
    <AuthLayout formClassName={styles.form}>
      <RegisterForm
        title="Step In. Create. Inspire."
        subtitle={
          <>
            AI-powered tools to bring your ideas
            <br />
            to life. Start your journey now!
          </>
        }
        submitLabel="Sign Up"
        googleLabel="Sign Up with Google"
      />
    </AuthLayout>
  );
};
