import React from "react";

export default function AudioPlayer(props) {
  return (
    <div className="audio footer d-flex flex-row justify-content-center">
      <audio className="w-50 m-auto" ref={props.audioRef} controls autoPlay>
        <source
          src={props.src ? `/watch/${props.src}` : ""}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
