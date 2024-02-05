import { ReactNode } from "react";
import styles from "./ModalBox.module.css";

interface Props {
  children: ReactNode;
}

export default function ModalBox({children} : Props) {
  return <div className={styles.modalBox}>{children}</div>;
}
