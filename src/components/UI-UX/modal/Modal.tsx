import React from "react";
import { createPortal } from "react-dom";
import Button from "../buttons/Button";
import styles from "./Modal.module.css";

type Error = {
  [key: string]: string | boolean;
};

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  error: Error;
}
export default function Modal({
  children,
  onClose,
  onKeyPress,
  error,
}: ModalProps) {
  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modalWrapper}>
        {error.isError ? <h2>{error.message}</h2> : children}
        <Button
          type="button"
          ariaLabel="Quit from results"
          onClick={onClose}
          onKeyDown={onKeyPress}
          tabIndex={0}
        >
          Quit
        </Button>
      </div>
    </div>,
    document.getElementById("modal-order") as HTMLElement
  );
}
