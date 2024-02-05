import React, { ReactNode } from "react";

import styles from "./InputField.module.css";

type Props = {
  type: "text" | string | undefined;
  id: string;
  name: string;
  ariaLabel: string;
  ariaRequired: boolean;
  placeholder?: string | undefined;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  pattern?: string;
  icon?: ReactNode;
  min?: string;
};

export default function InputField({
  type,
  id,
  name,
  ariaLabel,
  ariaRequired,
  placeholder,
  onChangeHandler,
  value,
  inputMode,
  pattern,
  icon,
  min
}: Props) {
  return (
    <div className={styles.inputBox}>
      <input
        type={type}
        id={id}
        data-test-id={name}
        className={styles.inputField}
        name={name}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
        inputMode={inputMode}
        pattern={pattern}
        min={min}
        required
      />
      {icon && <span className={styles.icon}>{icon}</span>}
    </div>
  );
}
