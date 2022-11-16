import React from "react";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function List(props) {
  return (
    <div className="mt-3">
      <Typography className="text-center" variant="h4">
        <ThumbUpIcon className="me-3"/>Liked Song
      </Typography>
      {props.data ? (
        null
      ) : null}
    </div>
  );
}
