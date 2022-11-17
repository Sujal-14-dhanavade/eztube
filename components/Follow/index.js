import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FollowButton from "../FollowButton";

export default function Liked(props) {
  const [followData, changeFollowData] = React.useState(null);
  React.useEffect(() => {
  }, []);
  return (
    <div className="d-flex flex-column p-lg-5 p-md-5 p-1">
      <Box className="mb-5">
        <Typography variant="h4" className="text-center">
          Followers
        </Typography>
      </Box>
      <Box
        sx={{ width: "100%" }}
        className="bg-dark p-lg-5 p-md-5 p-1 rounded shadow-lg"
      >
      </Box>
    </div>
  );
}
