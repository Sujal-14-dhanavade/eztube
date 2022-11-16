import React, { useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton } from "@mui/material";

export default function AudioPlayer(props) {
  const [turn, changeTurn] = React.useState(0);
  const [src, changeSrc] = React.useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (props.queue.isChange && props.queue.queue.length !== 0) {
        changeTurn(0);
        changeSrc(props.queue.queue[0].song);
        props.changeQueue({...props.queue, isChange: false });
        var promise = props.audioRef.current.pause();
        props.audioRef.current.load();
        if (promise !== undefined) {
          promise.then(() => {
            props.audioRef.current.play();
          });
        }
      } else if (
        props.audioRef.current.currentTime >=
          props.audioRef.current.duration - 2 &&
        props.queue.queue.length !== 0
      ) {
        if (turn === props.queue.queue.length - 1) {
          changeTurn(0);
          changeSrc(props.queue.queue[0].song);
          props.audioRef.current.pause();
          props.audioRef.current.load();
          props.audioRef.current.play();
        } else {
          changeTurn(turn + 1);
          changeSrc(props.queue.queue[turn + 1].song);
          props.audioRef.current.pause();
          props.audioRef.current.load();
          props.audioRef.current.play();
        }
      }
    }, 1000);
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
