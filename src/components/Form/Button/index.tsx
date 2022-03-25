import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "lg";
  color?: "primary" | "secondary"
  variant?: "flat" | "outlined" | "link";
}

export const Button = ({
  children,
  size = "lg",
  color = 'primary',
  variant = "flat",
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`${styles.button} ${styles[color]} ${styles[variant]} ${styles[size]} ${
        { ...rest }.className ?? ""
      }`}
    >
      {children}
    </button>
  );
};
