import {
  createActionCreatorInvariantMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import { Track } from "../interface/allTypes";

type MusicState = {
  isMusicLoaded: boolean;
  musicLibrary: Track[];
};

const musicInitialState: MusicState = {
  isMusicLoaded: false,
  musicLibrary: [],
};

const musicLibrarySlice = createSlice({
  name: "musicLibrary",
  initialState: musicInitialState,
  reducers: {
    updateMusicState: (state, action: { payload: Track[] }) => {
      state.isMusicLoaded = true;
      state.musicLibrary = action.payload;
    },
    emptyMusicState: (state) => {
      state.isMusicLoaded = false;
      state.musicLibrary = [];
    },
  },
});

export const { updateMusicState, emptyMusicState } = musicLibrarySlice.actions;
export { musicLibrarySlice };
