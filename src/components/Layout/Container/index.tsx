import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface ContainerProps {
  children: ReactNode;
  contentClass?: string;
  containerClass?: string;
}

export const Container = ({
  children,
  containerClass = "",
  contentClass = "",
}: ContainerProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${containerClass} ${contentClass}`}>{children}</div>
    </div>
  );
};
