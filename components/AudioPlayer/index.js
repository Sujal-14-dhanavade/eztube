import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { IconButton } from "@mui/material";

export default function AudioPlayer(props) {
  const [turn, changeTurn] = React.useState(0);
  const changeSong = () => {
    console.log(props.queue);
    console.log(turn);
    turn === props.queue.length - 1 ? changeTurn(0) : changeTurn(turn + 1);
    props.audioRef.current.pause();
    props.audioRef.current.load();
    props.audioRef.current.play();
  };
  return (
    <div className="footer d-flex flex-row justify-content-center">
      <audio
        className="w-50 m-auto"
        ref={props.audioRef}
        onEnded={changeSong}
        controls
        autoPlay
      >
        <source
          src={
            props.queue.length !== 0 ? `/watch/${props.queue[turn].song}` : ""
          }
          type="audio/mpeg"
        />
      </audio>
      <IconButton href="#">
        <NavigationIcon className="text-danger" />
      </IconButton>
    </div>
  );
}
