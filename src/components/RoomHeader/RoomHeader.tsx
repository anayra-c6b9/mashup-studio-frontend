import React, { FC } from "react";
import styles from "./RoomHeader.module.css";
import RoomMusicSearch from "../RoomMusicSearch/RoomMusicSearch";

interface RoomHeaderProps {}

const RoomHeader: FC<RoomHeaderProps> = () => (
  <div className={"relative top-0 left-0 w-full bg-white"}>
    <div className={"flex flex-row items-center justify-between py-3 px-3"}>
      <div className={"text-sm"}>
        Mashup
        <br />
        Studio
      </div>
      <RoomMusicSearch />
    </div>
  </div>
);

export default RoomHeader;
