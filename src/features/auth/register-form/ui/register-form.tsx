import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, AuthForm } from "@shared/ui";
import { useRegisterMutation } from "@features/auth/api";
import { useAuthRedirect } from "@shared/lib/hooks";
import { getApiErrorMessage } from "@shared/lib/api-error-handler";
import { ROUTES } from "@shared/config/routes";
import type { ReactNode } from "react";
import { registerSchema, type RegisterFormValues } from "../model/schema";

interface RegisterFormProps {
  title?: string;
  subtitle?: ReactNode;
  submitLabel?: string;
  googleLabel?: string;
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
  const [registerUser, { isLoading, isSuccess, error }] = useRegisterMutation();

  useAuthRedirect(isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...userData } = data;
    registerUser(userData);
  };

  return (
    <AuthForm
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      googleLabel={googleLabel}
      className={className}
      isLoading={isLoading}
      error={getApiErrorMessage(error, "Registration failed. Please try again.")}
      linkText={
        <>
          Already have an account?<span>Log in</span>
        </>
      }
      linkHref={ROUTES.LOGIN}
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
      <Input
        type="password"
        label="Repeat Password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
    </AuthForm>
  );
};
