import React from "react";

import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav>
      <div className={styles.titleContainer}>
        <h1>Calculate Delivery Fee</h1>
        <p className={styles.subTitle}>Your order</p>
      </div>
    </nav>
  );
}
