import React, { FC } from "react";
import styles from "./MusicElementInSearch.module.css";

interface MusicElementInSearchProps {
  id: string;
  count: number;
  title: string;
  url: string;
  addTrack: (trackId: string) => void;
}

const MusicElementInSearch: FC<MusicElementInSearchProps> = ({
  id,
  count,
  title,
  url,
  addTrack,
}) => (
  <div
    className={
      "w-full px-2 py-3 border  border-t-black border-b-black border-1 " +
      " flex flex-row items-center justify-between text-xs"
    }
  >
    <div className="text-sm overflow-x-hidden">
      {count}. {title}
    </div>
    <div
      className="shrink-0 flex items-center justify-center ml-3 w-4 h-4 border border-black rounded-full bg-white"
      onClick={() => addTrack(id)}
    >
      +
    </div>
  </div>
);

export default MusicElementInSearch;
