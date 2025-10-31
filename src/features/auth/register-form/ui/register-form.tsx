import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@shared/ui";
import { useRegisterMutation } from "@features/auth/api";
import styles from "./register-form.module.scss";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { GoogleIcon } from "@shared/ui";
import { registerSchema, type RegisterFormValues } from "../model/schema";
import clsx from "clsx";

interface RegisterFormProps {
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  googleLabel?: string;
  footer?: ReactNode;
  className?: string;
  onGoogleClick?: () => void;
}

export const RegisterForm = ({
  title,
  subtitle,
  submitLabel,
  googleLabel,
  className,
  onGoogleClick,
}: RegisterFormProps) => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isSuccess, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/home", { replace: true });
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...userData } = data;
    registerUser(userData);
  };

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          type="password"
          label="Repeat Password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        {error && (
          <span className={styles["form__error-text"]}>
            {error && 'data' in error && typeof error.data === 'object' && error.data && 'message' in error.data 
              ? String(error.data.message) 
              : 'Registration failed. Please try again.'}
          </span>
        )}
      </div>

      <Button
        className={styles.form__submit}
        type="submit"
        variant="primary"
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>

      <a
        className={clsx(styles.form__link, styles["form__link--primary"])}
        href="/"
      >
        Already have an account?<span>Log in</span>
      </a>

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
