import React, { FC, useState } from "react";
import styles from "./RoomJoinCard.module.css";
import { Form, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeMyComponent } from "../../store/uiSlice";

interface RoomJoinCardProps {}

const RoomJoinCard: FC<RoomJoinCardProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [roomCode, setRoomCode] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isMyComponentOpen);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRoomCode("");
    dispatch(closeMyComponent());
  };

  const joinRoomCall = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    // logic to join room goes here
    setRoomCode("");
    setIsDisabled(false);
    dispatch(closeMyComponent());
    // logic to navigate to room
    navigate(`/room/${roomCode}`);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  return (
    <div
      className={
        isOpen
          ? "font-jack overflow-x-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  " +
            " w-3/5 px-4 py-8 bg-white border-2 rounded-md border-black "
          : "invisible "
      }
    >
      <form className="relative flex flex-col gap-3 items-center justify-center">
        <button
          type="reset"
          className={
            "w-6 h-6 border p-2 border-solid border-black border-2 flex flex-col items-center justify-center absolute right-0 -top-4"
          }
          onClick={closeModal}
          disabled={isDisabled}
        >
          x
        </button>
        <div className="flex flex-col gap-2 pt-6 px-2">
          <label htmlFor="roomCode">Enter Room Code:</label>
          <input
            type="text"
            id="roomCode"
            name="roomCode"
            className="w-full border-2 border-black p-2"
            value={roomCode}
            onChange={onValueChange}
            placeholder="Room code"
            disabled={isDisabled}
            required
          />
        </div>
        <button
          type="submit"
          className="border-2 border border-black bg-black text-white rounded-md p-2 mt-4"
          disabled={isDisabled}
          onClick={joinRoomCall}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default RoomJoinCard;
