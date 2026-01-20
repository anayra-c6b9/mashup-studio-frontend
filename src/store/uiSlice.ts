import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isMyComponentOpen: boolean;
};

const initialState: UiState = {
  isMyComponentOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMyComponent: (state) => {
      state.isMyComponentOpen = true;
    },
    closeMyComponent: (state) => {
      state.isMyComponentOpen = false;
    },
    toggleMyComponent: (state) => {
      state.isMyComponentOpen = !state.isMyComponentOpen;
    },
    // optional: set explicitly with true/false
    setMyComponentOpen: (state, action: { payload: boolean }) => {
      state.isMyComponentOpen = action.payload;
    },
  },
});

// for music search modal
const musicModalState: UiState = {
  isMyComponentOpen: false,
};

const musicModalSlice = createSlice({
  name: "musicModal",
  initialState: musicModalState,
  reducers: {
    openMusicModal: (state) => {
      state.isMyComponentOpen = true;
    },
    closeMusicModal: (state) => {
      state.isMyComponentOpen = false;
    },
    toggleMusicModal: (state) => {
      state.isMyComponentOpen = !state.isMyComponentOpen;
    },
    setMusicModalOpen: (state, action: { payload: boolean }) => {
      state.isMyComponentOpen = action.payload;
    },
  },
});

export const {
  openMyComponent,
  closeMyComponent,
  toggleMyComponent,
  setMyComponentOpen,
} = uiSlice.actions;

export const {
  openMusicModal,
  closeMusicModal,
  toggleMusicModal,
  setMusicModalOpen,
} = musicModalSlice.actions;

export { uiSlice, musicModalSlice };
