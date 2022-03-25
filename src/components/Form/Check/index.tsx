import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox = ({ ...rest }: CheckBoxProps) => {
  return (
    <label className={styles.checkboxGroup}>
      <input {...rest} type="checkbox" className={styles.checkbox} />
      <span className={styles.checkmark} ></span>
    </label>
  )
};
