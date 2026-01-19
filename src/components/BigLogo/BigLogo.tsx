import React, { FC } from "react";
import styles from "./BigLogo.module.css";

interface BigLogoProps {}

const BigLogo: FC<BigLogoProps> = () => (
  <div className={styles.BigLogo}>
    <h1>MASHUP</h1>
    <h2>STUDIO</h2>
  </div>
);

export default BigLogo;
