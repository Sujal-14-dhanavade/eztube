import React, { useRef } from "react";
import AppNavbar from "../AppNavbar";
import Tabs from "../Tabs";
import Account from "../Account";
import Settings from "../Settings";
import Studio from "../Studio";
import Playlist from "../Playlist";
import Liked from "../Liked";
import AudioPlayer from "../AudioPlayer";

export default function studio(props) {
  const [page, changePage] = React.useState({
    account: false,
    setting: false,
    studio: false,
    playlist: false,
    likedSong: false,
  });

  const [src, changeSrc] = React.useState(null);
  const audioRef = useRef();
  return (
    <div className="d-flex flex-column justify-content-between dashboard">
      <AppNavbar data={props.data} toPage={changePage} />
      {page.account ? (
        <Account data={props.data} />
      ) : page.setting ? (
        <Settings data={props.data} />
      ) : page.studio ? (
        <Studio
          data={props.data}
          toPage={changePage}
          changeSrc={changeSrc}
          audioRef={audioRef}
        />
      ) : page.playlist ? (
        <Playlist data={props.data} changeSrc={src} />
      ) : page.likedSong ? (
        <Liked data={props.data} changeSrc={src} />
      ) : null}
      <Tabs id="offcanvasScrolling" toPage={changePage} />
      <AudioPlayer src={src} audioRef={audioRef} />
    </div>
  );
}
