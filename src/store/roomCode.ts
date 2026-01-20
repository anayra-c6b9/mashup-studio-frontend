import { createSlice } from "@reduxjs/toolkit";

type RoomState = {
  roomCode: string | null;
};

const roomInitialState: RoomState = {
  roomCode: null,
};

const roomCodeSlice = createSlice({
  name: "roomCode",
  initialState: roomInitialState,
  reducers: {
    updateRoomCode: (state, action: { payload: string }) => {
      state.roomCode = action.payload;
    },
    removeRoomCode: (state) => {
      state.roomCode = null;
    },
  },
});

export const { updateRoomCode, removeRoomCode } = roomCodeSlice.actions;
export { roomCodeSlice };
