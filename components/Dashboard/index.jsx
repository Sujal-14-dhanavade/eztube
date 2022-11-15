import React, { useRef, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import Tabs from "../Tabs";
import Account from "../Account";
import Settings from "../Settings";
import Studio from "../Studio";
import Playlist from "../Playlist";
import Liked from "../Liked";
import AudioPlayer from "../AudioPlayer";
import axios from "axios";

export default function studio(props) {
  const [playlistData, changeData] = React.useState(null);
  const [page, changePage] = React.useState({
    account: false,
    setting: false,
    studio: false,
    playlist: false,
    likedSong: false,
  });
  const [queue, changeQueue] = React.useState([]);

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "/api/getPlaylist",
      })
      .then((res) => {
        changeData(res.data);
      });
  }, []);

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
          playlistData={playlistData}
          changeData={changeData}
          queue={queue}
          changeQueue={changeQueue}
        />
      ) : page.playlist ? (
        <Playlist
          data={props.data}
          queue={queue}
          changeQueue={changeQueue}
          changeSrc={changeSrc}
          audioRef={audioRef}
          playlistData={playlistData}
          changeData={changeData}
        />
      ) : page.likedSong ? (
        <Liked
          data={props.data}
          queue={queue}
          changeQueue={changeQueue}
          changeSrc={changeSrc}
        />
      ) : null}
      <Tabs id="offcanvasScrolling" toPage={changePage} />
      <AudioPlayer
        src={src}
        queue={queue}
        changeQueue={changeQueue}
        audioRef={audioRef}
      />
    </div>
  );
}
