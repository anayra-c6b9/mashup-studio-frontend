import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import MusicElementInPlaylist from "../../../components/MusicElementInPlaylist/MusicElementInPlaylist";
import { Track } from "../../../interface/allTypes";
import { useOutletContext } from "react-router";

interface RoomIDProps {}

type OutletContextType = {
  wsRef: React.MutableRefObject<WebSocket | null>;
};

const RoomID: FC<RoomIDProps> = () => {
  const { wsRef } = useOutletContext<OutletContextType>();
  const queueList = useSelector((state: any) => state.musicQueue.musicQueue);
  const allTracks = useSelector(
    (state: any) => state.musicLibrary.musicLibrary,
  );

  const sendQueueRemove = (trackId: string) => {
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
        type: "queue_remove",
        payload: {
          trackId,
        },
      }),
    );
  };

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

  const playlistTracks: Track[] = useMemo(() => {
    return allTracks.filter((track: Track) => queueList.includes(track.id));
  }, [allTracks, queueList]);

  return (
    <div className="flex-1 overflow-y-auto ">
      {playlistTracks.map((track, index) => {
        return (
          <MusicElementInPlaylist
            key={index + 1}
            id={track.id}
            title={track.title}
            url={track.url}
            removeTrack={sendQueueRemove}
            playTrack={playMusic}
            pauseTrack={pauseMusic}
          />
        );
      })}
    </div>
  );
};

export default RoomID;
