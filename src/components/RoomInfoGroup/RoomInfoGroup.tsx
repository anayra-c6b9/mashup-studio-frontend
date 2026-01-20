import React, { FC } from "react";
import styles from "./RoomInfoGroup.module.css";
import UserIcon from "../../assets/user_icon.jpg";

interface RoomInfoGroupProps {
  wsRef: React.MutableRefObject<WebSocket | null>;
}

const RoomInfoGroup: FC<RoomInfoGroupProps> = ({ wsRef }) => {
  const closeConnection = () => {
    if (wsRef.current) {
      wsRef.current.close(1000, "user left");
      wsRef.current = null;
    }

    window.location.href = "/home";
  };
  return (
    <div
      className={
        "py-4 px-4 bg-white flex flex-row items-center justify-between"
      }
    >
      <div className={"flex flex-row items-center gap-1"}>
        <img
          src={UserIcon}
          alt="user icon"
          className=" w-6 h-6 border border-solid border-black rounded-full"
        />
        <div className="text-xs ">Users: </div>
      </div>
      <button
        className="bg-black border rounded-md px-4 py-2 text-white text-xs"
        onClick={closeConnection}
      >
        Leave
      </button>
    </div>
  );
};

export default RoomInfoGroup;
