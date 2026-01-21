import { FC, useEffect, useRef } from "react";
import { Outlet, useParams } from "react-router";
import RoomInfoGroup from "../../components/RoomInfoGroup/RoomInfoGroup";
import RoomHeader from "../../components/RoomHeader/RoomHeader";
import RoomMusicControls from "../../components/RoomMusicControls/RoomMusicControls";
import MusicListBackdrop from "../../components/MusicListBackdrop/MusicListBackdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  appendMusicQueue,
  removeMusicQueue,
  setMusicQueue,
} from "../../store/musicQueue";
import { RootState } from "../../store/store";
import {
  pauseTrack,
  playTrack,
  setNextTrack,
  setPrevTrack,
} from "../../store/musicStream";

interface RoomProps {}

const Room: FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams<{ roomId: string }>();
  const roomCode = roomId ?? "";
  const wsRef = useRef<WebSocket | null>(null);

  const currentTrackId = useSelector(
    (state: RootState) => state.musicStream.currentTrackId,
  );
  const isPlaying = useSelector(
    (state: RootState) => state.musicStream.isPlaying,
  );

  const currentPlayList = useSelector(
    (state: RootState) => state.musicQueue.musicQueue,
  );
  const currentPlayListRef = useRef<string[]>([]);
  currentPlayListRef.current = currentPlayList;

  const nextTrackId = useSelector(
    (state: RootState) => state.musicStream.nextTrackId,
  );
  const prevTrackId = useSelector(
    (state: RootState) => state.musicStream.prevTrackId,
  );
  const nextTrackIdRef = useRef<string | null>(null);
  nextTrackIdRef.current = nextTrackId;
  const prevTrackIdRef = useRef<string | null>(null);
  prevTrackIdRef.current = prevTrackId;

  // function to set current, next and prev tracks
  const setPlayList = (track: string) => {
    // if (op == 1) {
    //   console.log("Operation playnext: ", track);
    //   playMusic(track);
    // }
    // if (op == 2) {
    //   console.log("Operation play prev: ", track);
    //   playMusic(track);
    // }

    console.log("setting up playlist for: ", track);
    const list = currentPlayListRef.current;

    const currentTrack = track;
    const currentTrackIndex = list.indexOf(currentTrack);
    const prevId = Math.max(0, currentTrackIndex - 1);
    const nextId = Math.min(list.length - 1, currentTrackIndex + 1);

    console.log(currentTrackIndex, prevId, nextId);
    console.log(
      `currentTrack: ${list[currentTrackIndex]}, prev: ${list[prevId]}, next: ${list[nextId]}`,
    );
    dispatch(playTrack(currentTrack));
    dispatch(setNextTrack(list[nextId]));
    dispatch(setPrevTrack(list[prevId]));
  };

  useEffect(() => {
    console.log("```````` TrackID was changed");
    console.log("current: ", currentTrackId);
    console.log("next: ", nextTrackId);
    console.log("prev: ", prevTrackId);
  }, [currentTrackId]);

  useEffect(() => {
    if (!roomCode) return;

    console.log("🔌 Connecting WS for room:", roomCode);

    // Close existing socket (if any)
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(
      `${wsProtocol}://${window.location.host}/ws/room?code=${encodeURIComponent(roomCode)}`,
    );
    // const ws = new WebSocket(
    //   `ws://localhost:5500/ws/room?code=${encodeURIComponent(roomCode)}`,
    // );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "queue":
            dispatch(setMusicQueue(message.payload.queue));
            console.log("set the music queue again");
            console.log(message.payload.queue);
            break;
          case "queue_add":
            // console.log("Queue add called");
            // console.log("payload: ", message.payload);
            dispatch(appendMusicQueue(message.payload.trackId));
            // console.log("added a new song to queue");
            // console.log(message.payload.trackId);
            // console.log("updated song queue");
            // console.log(currentPlayListRef.current);
            break;
          case "queue_remove":
            dispatch(removeMusicQueue(message.payload.trackId));
            if (isPlaying && currentTrackId === message.payload.trackId) {
              // If the removed track is currently playing, pause and remove it
              dispatch(pauseTrack());
              // remove the song from the source as well
            }
            console.log("removed a song from queue");
            console.log(message.payload.trackId);
            break;
          case "play":
            // if (
            //   !currentPlayListRef.current.includes(message.payload.currentTrack)
            // )
            //   break;
            // get current song, next song to be played, previous song
            setPlayList(message.payload.currentTrack);
            break;
          case "pause":
            dispatch(pauseTrack());
            break;
          case "next":
            if (!nextTrackIdRef.current) break;
            console.log("> checking next track ID: ", nextTrackIdRef.current);
            setPlayList(nextTrackIdRef.current);
            break;
          case "prev":
            if (!prevTrackIdRef.current) break;
            console.log(
              "> checking previous Track ID: ",
              prevTrackIdRef.current,
            );
            setPlayList(prevTrackIdRef.current);
            break;
          case "playback":
            break;
          case "joined":
            break;
          default:
            console.warn("Unknown WS message:", message);
        }
      } catch {
        console.error("Invalid WS message:", event.data);
      }
    };

    ws.onerror = (err) => {
      console.error("WS error:", err);
    };

    ws.onclose = () => {
      console.log("🔌 WS closed");
    };

    // ✅ CLEANUP (this is what Strict Mode tests)
    return () => {
      console.log("🧹 Cleaning up WS");
      ws.close();
      wsRef.current = null;
    };
  }, [roomCode, dispatch]);

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

  return (
    <div className="relative font-jack flex flex-col justify-between h-screen">
      <MusicListBackdrop wsRef={wsRef} />
      <div className="shrink-0">
        <RoomHeader />
        <RoomInfoGroup wsRef={wsRef} />
      </div>
      <Outlet context={{ wsRef }} />
      <RoomMusicControls wsRef={wsRef} />
    </div>
  );
};

export default Room;
