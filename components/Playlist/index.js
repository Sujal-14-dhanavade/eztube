import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import Playlistform from "./Playlistform";

export default function Playlist(props) {

  useEffect(() => {
    axios.request({
      method: "GET",
      url: "/api/getPlaylist"
    }).then((res) => {console.log(res.data)});
  }, [])
  return (
    <div className="mt-3">
      <Typography className="text-center" variant="h4"><i class="fa-brands fa-napster me-3"></i>Playlist</Typography>
      <Playlistform />
    </div>
  );
}
