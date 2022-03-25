import { InputHTMLAttributes } from "react";

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = ({ placeholder, ...rest }: InputProps) => {
  return (
    <div className={styles.inputGroup}>
      <input placeholder={placeholder} {...rest} />
    </div>
  );
};
