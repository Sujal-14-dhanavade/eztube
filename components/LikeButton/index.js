import React from "react";
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export default function LikeButton(props) {
  const [isSet, changeSet] = React.useState(props.set);
  const toggleLike = () => {
    if (isSet) {
      axios
        .request({
          method: "POST",
          url: "/api/likeSong/remove",
          data: { songId: props.songId },
        })
        .then(() => {
          {
            props.setDependent ? props.setDependent(!props.dependent) : null;
          }
          changeSet(!isSet);
        });
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/likeSong/add",
          data: { songId: props.songId },
        })
        .then(() => {
          changeSet(!isSet);
        });
    }
  };
  return (
    <IconButton className="text-light" onClick={toggleLike}>
      {isSet ? (
        <>
          <FavoriteIcon className="text-danger me-3" />{" "}
          <Typography className="fw-bold">Liked</Typography>
        </>
      ) : (
        <FavoriteBorderIcon className="text-danger" />
      )}
    </IconButton>
  );
}
