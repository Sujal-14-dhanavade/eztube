import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FollowButton from "../FollowButton";
import { CardActionArea, Container } from "@mui/material";
import { Person } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FlagIcon from "@mui/icons-material/Flag";

export default function Liked(props) {
  const [followData, changeFollowData] = React.useState(null);
  const toggleClick = (id) => {
    axios
      .request({
        method: "POST",
        url: "/api/getUserSongs",
        data: { userId: id },
      })
      .then((res) => {
        if (res.data.length === 0) {
          props.changeQueue({ isChange: false, queue: [] });
          props.changeSrc(null);
          props.changeTurn(0);
          props.audioRef.current.load();
        } else {
          props.changeQueue({ isChange: true, queue: [...res.data] });
        }
      });
  };
  React.useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "/api/getFollow",
      })
      .then((res) => {
        console.log(res.data.user);
        if (res.data.user) changeFollowData(res.data.user);
      });
  }, []);
  return (
    <div className="d-flex flex-column p-lg-5 p-md-5 p-1" style={{marginBottom: "100px"}}>
      <Box className="mb-5">
        <Typography variant="h4" className="text-center">
          Followers
        </Typography>
      </Box>
      <Box
        sx={{ width: "100%" }}
        className="bg-transparent p-lg-5 p-md-5 p-1 rounded shadow-lg"
      >
        {followData && followData.length !== 0 ? (
          followData.map((item, idx) => (
            <Card
              className="rounded-pill w-50 mx-auto mt-2"
              sx={{ backgroundColor: "#000" }}
            >
              <CardActionArea className="w-100 d-flex justify-content-between" onClick={() => {toggleClick(item._id)}}>
                {item.userPic ? (
                  <CardMedia
                    component="img"
                    className="w-50 mx-lg-0 mx-md-0 mx-auto rounded"
                    image={`/avatar/userPic/${item.userPic}`}
                    alt="playlist Pic"
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    className="w-50"
                    sx={{ padding: "15%" }}
                  >
                    <Person sx={{ fontSize: "3rem" }} />
                  </Avatar>
                )}
                <CardContent className="text-light">
                  <Typography gutterBottom variant="h5" component="div">
                    {item.username}{" "}
                    {item.verified ? (
                      <VerifiedUserIcon className="text-success" />
                    ) : null}
                  </Typography>
                  <Typography>
                    <FlagIcon className="me-3" /> {item.country}
                  </Typography>
                  <Typography>
                    <BookmarkIcon className="me-3 text-warning" />{" "}
                    {item.followers}
                  </Typography>
                </CardContent>
                <CardContent>
                  {props.follow ? (
                    <FollowButton
                      userId={item._id}
                      set={props.follow.includes(item._id)}
                    />
                  ) : null}
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography className="text-center">No Result</Typography>
        )}
      </Box>
    </div>
  );
}
