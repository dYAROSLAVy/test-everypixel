import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, AuthForm } from "@shared/ui";
import { useLoginMutation } from "@features/auth/api";
import { useAuthRedirect } from "@shared/lib/hooks";
import { getApiErrorMessage } from "@shared/lib/api-error-handler";
import { ROUTES } from "@shared/config/routes";
import type { ReactNode } from "react";
import { loginSchema, type LoginFormValues } from "../model/schema";

interface LoginFormProps {
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  googleLabel?: string;
  className?: string;
  onGoogleClick?: () => void;
}

export const LoginForm = ({
  title,
  subtitle,
  submitLabel,
  googleLabel,
  className,
  onGoogleClick,
}: LoginFormProps) => {
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  useAuthRedirect(isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <AuthForm
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      googleLabel={googleLabel}
      className={className}
      isLoading={isLoading}
      error={getApiErrorMessage(error, "Incorrect username or password")}
      linkText={
        <>
          Don't have an account?
          <span> Sign up</span>
        </>
      }
      linkHref={ROUTES.REGISTER}
      forgotPasswordHref="#"
      onSubmit={handleSubmit(onSubmit)}
      onGoogleClick={onGoogleClick}
    >
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
    </AuthForm>
  );
};
