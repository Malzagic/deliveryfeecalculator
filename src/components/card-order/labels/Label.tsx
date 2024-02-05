import React, { ReactNode } from "react";
import styles from "./Label.module.css";

type Props = {
  htmlFor: string;
  children: ReactNode;
};

export default function Label({ htmlFor, children }: Props) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
}
