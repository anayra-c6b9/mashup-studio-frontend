import { configureStore } from "@reduxjs/toolkit";
import { musicModalSlice, uiSlice } from "./uiSlice";
import { musicLibrarySlice } from "./musicLibrarySlice";
import { roomCodeSlice } from "./roomCode";
import { musicQueueSlice } from "./musicQueue";
import { musicStreamSlice } from "./musicStream";
("./uiSlice");

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    musicModal: musicModalSlice.reducer,
    musicLibrary: musicLibrarySlice.reducer,
    roomCode: roomCodeSlice.reducer,
    musicQueue: musicQueueSlice.reducer,
    musicStream: musicStreamSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
