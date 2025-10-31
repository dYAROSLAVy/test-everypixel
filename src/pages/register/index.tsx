import { EverypixelLogo } from "@shared/ui";
import styles from "./register.module.scss";
import { RegisterForm } from "@features/auth/register-form/ui/register-form";

export const RegisterPage = () => {
  return (
    <div className="wrapper">
      <main>
        <h1 className="visually-hidden">Sing Up form</h1>
        <span className={styles.logo}>
          <EverypixelLogo />
        </span>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <RegisterForm
                className={styles.form}
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
              <div className={styles.imageContainer}>
                <img
                  src="/bg.png"
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
