import React from "react";

import styles from "./Button.module.css";

type Props = {
  type: "submit" | "reset" | "button" | undefined;
  ariaLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> |undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  tabIndex?: number;
  children: string;
};

export default function Button({ type, ariaLabel, onClick, onKeyDown, tabIndex, children }: Props) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={styles.btn}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}
