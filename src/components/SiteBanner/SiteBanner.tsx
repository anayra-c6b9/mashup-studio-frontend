import React, { FC } from "react";
import styles from "./SiteBanner.module.css";
import bigLogo from "../../assets/logo_big.png";

interface SiteBannerProps {}

const SiteBanner: FC<SiteBannerProps> = () => (
  <div className="w-full">
    <div className="w-9/12 m-auto">
      <img src={bigLogo} alt="Mashup Studio" className="object-cover" />
    </div>
  </div>
);

export default SiteBanner;
