import {
  createActionCreatorInvariantMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import { Track } from "../interface/allTypes";
import { act } from "react";

type MusicStreamState = {
  currentTrackId?: string | null;
  isPlaying: boolean;
  nextTrackId: string | null;
  prevTrackId: string | null;
  currentTimestampMinute: number;
  currentTimeStampSecond: number;
};

const InitialMusicStreamState: MusicStreamState = {
  currentTrackId: null,
  isPlaying: false,
  nextTrackId: null,
  prevTrackId: null,
  currentTimeStampSecond: 0,
  currentTimestampMinute: 0,
};

const musicStreamSlice = createSlice({
  name: "musicStream",
  initialState: InitialMusicStreamState,
  reducers: {
    playTrack: (state, action: { payload: string | null }) => {
      state.isPlaying = true;
      state.currentTrackId = action.payload;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    setCurrentTrack: (state, action: { payload: string | null }) => {
      state.currentTrackId = action.payload;
    },
    setNextTrack: (state, action: { payload: string | null }) => {
      state.nextTrackId = action.payload;
    },
    setPrevTrack: (state, action: { payload: string | null }) => {
      state.prevTrackId = action.payload;
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
} = musicStreamSlice.actions;
export { musicStreamSlice };
