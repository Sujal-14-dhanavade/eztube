import { Typography } from "@mui/material";
import React from "react";
import Playlistform from "./Playlistform";

export default function Playlist(props) {

  return (
    <div className="mt-3">
      <Typography className="text-center" variant="h4"><i class="fa-brands fa-napster me-3"></i>Playlist</Typography>
      <Playlistform />
    </div>
  );
}
