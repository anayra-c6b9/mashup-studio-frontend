import { FC } from "react";
import { Outlet } from "react-router";

interface RoomProps {}

const Room: FC<RoomProps> = () => {
  return (
    <div>
      This is the room
      <Outlet />
    </div>
  );
};

export default Room;
