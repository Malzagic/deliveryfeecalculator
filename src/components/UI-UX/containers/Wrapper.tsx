import React, { ReactNode } from "react";
import styles from "./Wrapper.module.css";
type Props = {
  children: ReactNode;
};

export default function Wrapper({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>;
}
