import React, { FC } from "react";
import styles from "./MusicListBackdrop.module.css";
import MusicElementInSearch from "../MusicElementInSearch/MusicElementInSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeMusicModal } from "../../store/uiSlice";

interface MusicListBackdropProps {
  wsRef: React.MutableRefObject<WebSocket | null>;
}

const MusicListBackdrop: FC<MusicListBackdropProps> = ({ wsRef }) => {
  const dispatch = useDispatch();
  const musicList = useSelector(
    (state: RootState) => state.musicLibrary.musicLibrary,
  );
  const musicModalOpen = useSelector(
    (state: RootState) => state.musicModal.isMyComponentOpen,
  );

  const closeSearchModal = () => {
    dispatch(closeMusicModal());
  };

  const allTracks = useSelector(
    (state: RootState) => state.musicQueue.musicQueue,
  );

  const sendQueueAdd = (trackId: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const trackExists = allTracks.some((track) => track === trackId);
    if (trackExists) {
      console.warn("Track already exists:", trackId);
      return;
    }

    ws.send(
      JSON.stringify({
        type: "queue_add",
        payload: { trackId },
      }),
    );
  };

  return (
    <div
      className={
        musicModalOpen
          ? "fixed w-full h-screen backdrop-blur-md top-0 left-0 z-40 overflow-hidden flex flex-col items-center justify-center "
          : "invisible w-0 h-0"
      }
    >
      <div className="bg-white w-4/5 border border-black border-2 rounded-lg z-50 py-6 px-3 flex gap-3 flex-col overflow-x-hidden overflow-y-scroll">
        <div className="flex flex-row items-center justify-between">
          <button
            className="text-white bg-black border rounded-full text-sm w-8 h-8"
            onClick={closeSearchModal}
          >
            &lt;
          </button>
          <input
            type="text"
            name="search"
            id="music_search"
            className="w-4/5 border border-black border-2 rounded-md px-2 py-2 text-xs"
          />
        </div>
        <div className="w-100 flex flex-col items-center max-h-96 overflow-y-scroll border border-black border-2 rounded-sm">
          {musicList.length === 0 ? (
            <p className="text-gray-500 text-sm mt-4">
              No music found. Please search to load music.
            </p>
          ) : (
            musicList.map((track, index) => {
              return (
                <MusicElementInSearch
                  count={index + 1}
                  key={index + 1}
                  id={track.id}
                  title={track.title}
                  url={track.url}
                  addTrack={sendQueueAdd}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicListBackdrop;
