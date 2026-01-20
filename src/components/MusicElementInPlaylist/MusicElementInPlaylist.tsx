import React, { FC } from "react";
import styles from "./MusicElementInPlaylist.module.css";
import PlayIcon from "../../assets/play.png";
import PauseIcon from "../../assets/pause.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface MusicElementInPlaylistProps {
  id: string;
  title: string;
  url: string;
  removeTrack: (trackId: string) => void;
  playTrack: (trackId: string) => void;
  pauseTrack: () => void;
}

const MusicElementInPlaylist: FC<MusicElementInPlaylistProps> = ({
  id,
  title,
  url,
  removeTrack,
  playTrack,
  pauseTrack,
}) => {
  const isPlaying = useSelector(
    (state: RootState) => state.musicStream.isPlaying,
  );
  const currentTrackId = useSelector(
    (state: RootState) => state.musicStream.currentTrackId,
  );

  return (
    <div
      className={
        "w-full px-2 py-3 border  border-t-black border-b-black border-1 " +
        " flex flex-row items-center justify-between text-xs"
      }
    >
      <div className="text-sm overflow-x-hidden">{title}</div>
      <div className="flex flex-row items-center justify-center">
        <div
          className="shrink-0 flex items-center justify-center ml-3 w-6 h-6"
          onClick={() => {}}
        >
          {isPlaying && currentTrackId === id ? (
            <button
              onClick={() => {
                pauseTrack();
              }}
            >
              <img src={PauseIcon} alt="Pause Icon" className="w-6 h-6" />
            </button>
          ) : (
            <button
              className="w-6 h-6 border border-black border-2 rounded-full flex items-center justify-center"
              onClick={() => {
                playTrack(id);
              }}
            >
              <img src={PlayIcon} alt="Play Icon" className="w-4 h-4" />
            </button>
          )}
        </div>
        <div
          className="shrink-0 flex items-center justify-center mx-3 w-6 h-6 border border-black rounded-full bg-white"
          onClick={() => {
            removeTrack(id);
          }}
        >
          -
        </div>
      </div>
    </div>
  );
};

export default MusicElementInPlaylist;
