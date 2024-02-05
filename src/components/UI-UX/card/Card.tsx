import React, { ReactNode } from "react";

import styles from "./Card.module.css";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return <main className={styles.card}>{children}</main>;
}
