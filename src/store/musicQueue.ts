import {
  createActionCreatorInvariantMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import { Track } from "../interface/allTypes";

type MusicQueueState = {
  musicQueue: string[];
};

const musicQueueInitialState: MusicQueueState = {
  musicQueue: [],
};

const musicQueueSlice = createSlice({
  name: "musicLibrary",
  initialState: musicQueueInitialState,
  reducers: {
    setMusicQueue: (state, action: { payload: string[] }) => {
      state.musicQueue = action.payload;
    },
    appendMusicQueue: (state, action: { payload: string }) => {
      state.musicQueue.push(action.payload);
    },
    emptyMusicQueue: (state) => {
      state.musicQueue = [];
    },
    removeMusicQueue: (state, action: { payload: string }) => {
      state.musicQueue = state.musicQueue.filter(
        (trackId) => trackId !== action.payload,
      );
    },
  },
});

export const {
  setMusicQueue,
  appendMusicQueue,
  emptyMusicQueue,
  removeMusicQueue,
} = musicQueueSlice.actions;
export { musicQueueSlice };
