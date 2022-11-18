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
import Home from "./Home";
import Follow from "../Follow";
import SearchResult from "../SearchResult";

export default function studio(props) {
  const [playlistData, changeData] = React.useState(null);
  const [page, changePage] = React.useState({
    account: false,
    setting: false,
    studio: false,
    playlist: false,
    likedSong: false,
    follow: false,
    search: false,
  });
  const [queue, changeQueue] = React.useState({
    isChange: false,
    queue: [],
  });
  const [turn, changeTurn] = React.useState(0);
  const [src, changeSrc] = React.useState(null);
  const [searchContent, changeContent] = React.useState({
    songs: [],
    users: []
  });
  const [query, changeQuery] = React.useState("");
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
  const audioRef = useRef();
  return (
    <div className="dashboard">
      <AppNavbar data={props.data} toPage={changePage} changeQuery={changeQuery}/>
      {page.account ? (
        <Account data={props.data} toPage={changePage} changeQuery={changeQuery}/>
      ) : page.setting ? (
        <Settings data={props.data} toPage={changePage} changeQuery={changeQuery}/>
      ) : page.studio ? (
        <Studio
          data={props.data}
          toPage={changePage}
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
          audioRef={audioRef}
          playlistData={playlistData}
          changeData={changeData}
          changeTurn={changeTurn}
          changeSrc={changeSrc}
        />
      ) : page.likedSong ? (
        <Liked
          data={props.data.liked_songs}
          queue={queue}
          changeQueue={changeQueue}
          playlistData={playlistData}
          changeData={changeData}
        />
      ) : page.follow ? (
        <Follow
          follow={props.data.follow}
          changeTurn={changeTurn}
          changeSrc={changeSrc}
          audioRef={audioRef}
          changeQueue={changeQueue}
        />
      ) : page.search ? (
        <SearchResult
          changeContent={changeContent}
          searchContent={searchContent}
          data={props.data}
          LikedData={props.data.liked_songs}
          queue={queue}
          changeQueue={changeQueue}
          playlistData={playlistData}
          changeData={changeData}
          followData={props.data.follow}
          likedData = {props.data.follow}
          changeTurn={changeTurn}
          changeSrc={changeSrc}
          audioRef={audioRef}
          toPage={changePage}
          changeQuery={changeQuery}
        />
      ) : (
        <Home
          data={props.data}
          LikedData={props.data.liked_songs}
          queue={queue}
          changeQueue={changeQueue}
          playlistData={playlistData}
          changeData={changeData}
          followData={props.data.follow}
          changeTurn={changeTurn}
          changeSrc={changeSrc}
          audioRef={audioRef}
          
        />
      )}
      <Tabs
        id="offcanvasScrolling"
        toPage={changePage}
        changeContent={changeContent}
        query={query}
        changeQuery={changeQuery}
      />
      <AudioPlayer
        LikedData={props.data.liked_songs}
        queue={queue}
        changeQueue={changeQueue}
        audioRef={audioRef}
        turn={turn}
        changeTurn={changeTurn}
        src={src}
        changeSrc={changeSrc}
      />
    </div>
  );
}
