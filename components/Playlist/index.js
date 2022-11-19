import { Typography } from "@mui/material";
import React from "react";
import Playlistform from "./Playlistform";
import List from "./List";
import PlayListSongs from "./PlayListSongs";

export default function Playlist(props) {
  const [list, changePage] = React.useState(true);
  const [whichPlaylist, changePlaylist] = React.useState(null);

  return (
    <>
      {list ? (
        <div className="mt-3" style={{marginBottom: "100px"}}>
          <Typography className="text-center" variant="h4">
            <i className="fa-brands fa-napster me-3"></i>Playlist
          </Typography>
          <Playlistform changeData = {props.changeData}/>
          {props.playlistData ? <List playlistData={props.playlistData} changePage={changePage} changePlaylist={changePlaylist}/>: null}
        </div>
      ) : <PlayListSongs LikedData={props.data.liked_songs} queue={props.queue} changeQueue={props.changeQueue} audioRef={props.audioRef} changeSrc={props.changeSrc} changeTurn={props.changeTurn} playlist={whichPlaylist} changePage={changePage} changePlaylist={changePlaylist}/>}
    </>
  );
}
