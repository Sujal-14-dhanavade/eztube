import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import Playlistform from "./Playlistform";
import List from "./List";

export default function Playlist(props) {
  const [playlistData, changeData] = React.useState(null);
  const [list, changePage] = React.useState(true);
  const [whichPlaylist, changePlaylist] = React.useState(null);
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

  return (
    <>
      {list ? (
        <div className="mt-3">
          <Typography className="text-center" variant="h4">
            <i class="fa-brands fa-napster me-3"></i>Playlist
          </Typography>
          <Playlistform changeData = {changeData}/>
          {playlistData ? <List playlistData={playlistData}/>: null}
        </div>
      ) : null}
    </>
  );
}
