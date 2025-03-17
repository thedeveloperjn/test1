import React from "react";
import PlayButton from "../../public/play.svg";
import PauseButton from "../../public/pause.svg";
import Image from "next/image";
import {
  CirclePause,
  CirclePauseIcon,
  CirclePlayIcon,
  Pause,
  Play,
} from "lucide-react";

interface VideoPlayerControlsProps {
  progress: number;
  size?: number | undefined;
  width?: number | undefined;
  isPaused: boolean;
  onPlayPause: () => void;
}

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  progress,
  size = 40,
  width = 2,
  isPaused,
  onPlayPause,
}) => {
  const center = size / 2;
  const radius = center - width;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div className="relative flex justify-center items-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#aaaaaa"
          strokeWidth={width}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth={width}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset || 0}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute group hover:cursor-pointer">
        {/* <button className="group cursor-pointer flex justify-center items-center"> */}
        {/* <div className=" fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200 ease-in-out"> */}
        {isPaused ? (
          <Play onClick={onPlayPause} size={25} color="white" />
        ) : (
          <Pause onClick={onPlayPause} size={25} color="white" />
          // <Image src={"/play.svg"} alt="play" width={10} height={10} />
          // <Image src={"/pause.svg"} alt="pause" width={10} height={10} />
        )}
        {/* </div> */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default VideoPlayerControls;
