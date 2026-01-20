import React, { FC, use, useEffect, useState } from "react";
import styles from "./RoomMusicSearch.module.css";
import searchIcon from "../../assets/search.png";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { openMusicModal } from "../../store/uiSlice";
import { getLibrary } from "../../apis";
import { Track } from "../../interface/allTypes";
import {
  emptyMusicState,
  updateMusicState,
} from "../../store/musicLibrarySlice";

interface RoomMusicSearchProps {}

const RoomMusicSearch: FC<RoomMusicSearchProps> = () => {
  const dispatch = useDispatch();
  const searchIsOpen = useSelector(
    (state: RootState) => state.musicModal.isMyComponentOpen,
  );
  const musicLibrary = useSelector(
    (state: RootState) => state.musicLibrary.isMusicLoaded,
  );

  const [response, setResponse] = useState<Track[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const run = async (fn: () => Promise<any>) => {
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      const data: Track[] = await fn();
      setResponse(data);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Example: auto-load library on mount
  useEffect(() => {
    run(() => getLibrary());
  }, []);

  useEffect(() => {
    if (response) {
      dispatch(updateMusicState(response));
      console.log(response);
    } else {
      dispatch(emptyMusicState());
    }
  }, [response, dispatch]);

  const onSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(openMusicModal());
  };

  return (
    <button
      className={
        "p-2 rounded-md border border-black border-2 flex flex-row " +
        " text-gray-500 text-xs items-center gap-2"
      }
      onClick={onSearchClick}
      disabled={searchIsOpen}
    >
      search
      <img src={searchIcon} alt="search icon" className="w-4 h-4" />
    </button>
  );
};

export default RoomMusicSearch;
