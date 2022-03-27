import { ProgressHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  max: number;
  value: number;
}

export const ProgressBar = ({ max, value, ...rest }: ProgressBarProps) => {
  return <progress className={styles.progress} max={max} value={value} {...rest}></progress>;
};
