import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary";
  startIcon?: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant,
  startIcon,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant && styles[`button--${variant}`],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {startIcon && <span className={styles.button__icon}>{startIcon}</span>}
      {isLoading ? "Loading..." : children}
    </button>
  );
};
