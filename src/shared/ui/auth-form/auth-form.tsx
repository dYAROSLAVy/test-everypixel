import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@shared/ui";
import { GoogleIcon } from "@shared/ui";
import clsx from "clsx";
import styles from "./auth-form.module.scss";

interface AuthFormProps {
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  googleLabel?: string;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  children: ReactNode;
  linkText?: ReactNode;
  linkHref?: string;
  forgotPasswordHref?: string;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleClick?: () => void;
}

export const AuthForm = ({
  title,
  subtitle,
  submitLabel,
  googleLabel,
  className,
  isLoading,
  error,
  children,
  linkText,
  linkHref,
  forgotPasswordHref,
  onSubmit,
  onGoogleClick,
}: AuthFormProps) => {
  return (
    <form className={clsx(styles.form, className)} onSubmit={onSubmit}>
      {title && <h1 className={styles.form__title}>{title}</h1>}
      {subtitle && <p className={styles.form__subtitle}>{subtitle}</p>}

      {googleLabel && (
        <Button
          type="button"
          className={styles.form__google}
          startIcon={<GoogleIcon />}
          onClick={onGoogleClick}
        >
          {googleLabel}
        </Button>
      )}
      <div className={styles.form__decor}>
        <span>OR</span>
      </div>

      <div className={styles["form__inputs-wrapper"]}>
        {children}
        {error && <span className={styles["form__error-text"]}>{error}</span>}
      </div>

      <Button
        className={styles.form__submit}
        type="submit"
        variant="primary"
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>

      {linkText && linkHref && (
        <Link
          to={linkHref}
          className={clsx(styles.form__link, styles["form__link--primary"])}
        >
          {linkText}
        </Link>
      )}

      {forgotPasswordHref && (
        <Link
          to={forgotPasswordHref}
          className={clsx(styles.form__link, styles["form__link--primary"])}
        >
          <span>Forgot Password?</span>
        </Link>
      )}

      <div className={styles.form__rules}>
        <p className={styles.form__text}>
          By signing up to the Workroom platform you understand and agree with
          our{" "}
          <a className={styles.form__link} href="/">
            <span> Terms of Use</span>
          </a>{" "}
          and{" "}
          <a className={styles.form__link} href="/">
            <span>Privacy Policy</span>
          </a>
        </p>
        <p className={styles.form__text}>
          Having trouble? Contact us at{" "}
          <a className={styles.form__link} href="/">
            <span>workroom@everypixel.com</span>
          </a>
        </p>
      </div>
    </form>
  );
};
