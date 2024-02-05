import React, { ReactNode } from "react";

import styles from "./InputContainer.module.css";
type Props = {
  children: ReactNode;
};

export default function InputContainer({ children }: Props) {
  return <div className={styles.inputContainer}>{children}</div>;
}
