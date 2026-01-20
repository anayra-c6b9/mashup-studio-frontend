import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./RoomMusicControls.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PrevIcon from "../../assets/previous.png";
import NextIcon from "../../assets/next.png";
import PauseIcon from "../../assets/pause.png";
import PlayIcon from "../../assets/play.png";
import MarqueeStyleText from "../MarqueeStyleText/MarqueeStyleText";

interface RoomMusicControlsProps {
  wsRef: React.MutableRefObject<WebSocket | null>;
}

const RoomMusicControls: FC<RoomMusicControlsProps> = ({ wsRef }) => {
  const currentTrack = useSelector(
    (state: RootState) => state.musicStream.currentTrackId,
  );
  const isTrackPlaying = useSelector(
    (state: RootState) => state.musicStream.isPlaying,
  );
  const isAllTracksLoaded = useSelector(
    (state: RootState) => state.musicLibrary.isMusicLoaded,
  );
  const allTracks = useSelector(
    (state: RootState) => state.musicLibrary.musicLibrary,
  );
  const playlistTracks = useSelector(
    (state: RootState) => state.musicQueue.musicQueue,
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [trackName, setTrackName] = useState<string | null>(null);
  const [trackUrl, setTrackUrl] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // BASE URL
  const BASE_URL = "http://localhost:5500";

  // resolve track name and url
  useEffect(() => {
    if (!currentTrack) return;

    const track = allTracks.find((t) => t.id === currentTrack);
    if (!track) return;

    setTrackName(track.title);
    setTrackUrl(`${BASE_URL}${track.url}`);
  }, [currentTrack, allTracks]);

  // play/pause audio when redux state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !trackUrl) return;

    if (audio.src !== trackUrl) {
      audio.src = trackUrl;
      audio.load();
    }

    if (isTrackPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [trackUrl, isTrackPlaying]);

  // audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const playMusic = (trackId: string) => {
    const ws = wsRef.current;
    if (!ws) {
      console.warn("WS not connected");
      return;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("WS not open. state:", ws.readyState);
      return;
    }

    console.log("sending ws signal to play: ", trackId);
    ws.send(
      JSON.stringify({
        type: "play",
        payload: {
          trackId: trackId,
        },
      }),
    );
  };

  const pauseMusic = () => {
    const ws = wsRef.current;
    if (!ws) {
      console.warn("WS not connected");
      return;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("WS not open. state:", ws.readyState);
      return;
    }

    ws.send(
      JSON.stringify({
        type: "pause",
      }),
    );
  };

  const playNext = () => {
    const ws = wsRef.current;
    if (!ws) {
      console.warn("WS not connected");
      return;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("WS not open. state:", ws.readyState);
      return;
    }

    ws.send(
      JSON.stringify({
        type: "next",
      }),
    );
  };

  const playPrev = () => {
    console.log("clicked prev");
    const ws = wsRef.current;
    if (!ws) {
      console.warn("WS not connected");
      return;
    }

    if (ws.readyState !== WebSocket.OPEN) {
      console.warn("WS not open. state:", ws.readyState);
      return;
    }

    ws.send(
      JSON.stringify({
        type: "prev",
      }),
    );
  };

  // progress bar
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const pct = Number(e.target.value);
    audio.currentTime = (pct / 100) * duration;
  };

  if (!currentTrack) return <div className="shrink-0 w-0 h-0"></div>;

  return (
    <div className="shrink-0">
      <div className="relative pt-3">
        <div className="w-full h-24 border-2 border-black bg-white/80 rounded-md">
          <div className="w-full h-full flex flex-col items-center justify-between px-6 py-3">
            <MarqueeStyleText text={trackName || ""} className="text-xs" />

            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={onSeek}
              className="w-full"
            />
            <div className="w-full flex flex-row items-center justify-center gap-10">
              <button className="w-6 h-6">
                <img
                  src={PrevIcon}
                  alt="Previous Track"
                  onClick={() => {
                    playPrev();
                  }}
                />
              </button>
              {isTrackPlaying ? (
                <button
                  onClick={() => {
                    pauseMusic();
                  }}
                >
                  <img src={PauseIcon} alt="Pause Icon" className="w-8 h-8" />
                </button>
              ) : (
                <button
                  className="w-8 h-8 border border-black border-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    playMusic(currentTrack);
                  }}
                >
                  <img src={PlayIcon} alt="Play Icon" className="w-4 h-4" />
                </button>
              )}
              <button className="w-6 h-6">
                <img
                  src={NextIcon}
                  alt="Next Track"
                  onClick={() => {
                    playNext();
                  }}
                />
              </button>
            </div>
          </div>
          <audio ref={audioRef} />
        </div>
      </div>
    </div>
  );
};
export default RoomMusicControls;
