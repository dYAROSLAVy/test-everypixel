import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeOffIcon } from "../icons";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: ReactNode;
}

export const Input = ({
  label,
  error,
  type,
  endIcon,
  className = "",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={styles.input}>
      {label && <label className={styles.input__label}>{label}</label>}
      <div className={styles.input__wrapper}>
        <input
          className={clsx(
            styles.input__field,
            error && styles["input__field--error"],
            (endIcon || isPassword) && styles["input__field--with-icon"],
            className
          )}
          type={inputType}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.input__icon}
            onClick={() => setShowPassword(!showPassword)}
            disabled={props.disabled}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
        {!isPassword && endIcon && (
          <span className={styles.input__icon}>{endIcon}</span>
        )}
      </div>
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};
