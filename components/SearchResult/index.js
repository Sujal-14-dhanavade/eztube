import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function SearchResult(props) {
  return (
    <React.Fragment>
      <Box>
        <IconButton
          className="text-light"
          onClick={() => {
            props.changeContent(null);
            props.toPage({
              account: false,
              setting: false,
              studio: false,
              playlist: false,
              likedSong: false,
              follow: false,
              search: false,
            });
            props.changeQuery("");
          }}
        >
          <CloseIcon sx={{fontSize: "2rem"}}/>
        </IconButton>
      </Box>
      {props.searchContent}
    </React.Fragment>
  );
}
