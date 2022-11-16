import React, { useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton } from "@mui/material";
import $ from "jQuery";

export default function AudioPlayer(props) {
  const [turn, changeTurn] = React.useState(0);
  const [src, changeSrc] = React.useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (
        src === null &&
        props.queue.length !== 0
      ) {
        changeSrc(props.queue[turn].song);
        props.audioRef.current.pause();
        props.audioRef.current.load();
        props.audioRef.current.play();
      } else if (
        props.audioRef.current.currentTime >=
          props.audioRef.current.duration - 2 &&
        props.queue.length !== 0
      ) {
        if (turn === props.queue.length - 1) {
          changeTurn(0);
        } else {
          changeTurn(turn + 1);
        }
        changeSrc(props.queue[turn].song);
        props.audioRef.current.pause();
        props.audioRef.current.load();
        props.audioRef.current.play();
      }
    }, 2000);
  });
  return (
    <div className="footer d-flex flex-row justify-content-center">
      <audio className="w-50 m-auto" ref={props.audioRef} controls autoPlay>
        <source src={src ? `/watch/${src}` : ""} type="audio/mpeg" />
      </audio>
      <IconButton href="#">
        <NavigationIcon className="text-danger" />
      </IconButton>
    </div>
  );
}
