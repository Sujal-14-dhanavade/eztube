import {
  Typography,
  useMediaQuery,
  Grid,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Container } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect } from "react";
import axios from "axios";
import LikeButton from "../LikeButton";

export default function RecentPlayed(props) {
  const match = useMediaQuery("(max-width: 768px)");
  const ipad = useMediaQuery("(max-width: 1024px) and (min-width: 768px)");
  const [recentData, setData] = React.useState(null);
  useEffect(() => {
    const recentSong = props.data.map((x) => x.song_id);
    axios
      .request({
        method: "POST",
        url: "/api/getSongPlaylist",
        data: { songs: recentSong },
      })
      .then((res) => {
        if (res.data.songs) {
          setData(res.data.songs);
        }
      });
  }, []);
  return (
    <Container className="p-lg-2 p-md-2 p-1 bg-transparent rounded shadow-lg">
      <Typography
        variant="h5"
        sx={{ textAlign: match ? "center" : "left" }}
        className="mx-3 my-4"
      >
        <i className="fa-solid fa-rotate-right me-3"></i>Recent Played
      </Typography>
      <div>
        <Container className="d-flex  flex-lg-row flex-md-row flex-column justify-content-between">
          {props.data && props.data.length !== 0 && recentData !== null ? (
            <React.Fragment>
              {recentData.map((item, idx) => (
                <Card className="bg-dark mx-1 mb-3" sx={{width: match? "100%": "75%"}} elevation={5} key={idx}>
                  <CardActionArea
                    onClick={async () => {
                      props.changeQueue({
                        isChange: true,
                        queue: [item, ...props.queue.queue],
                      });
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={`/avatar/songPic/${item.songPic}`}
                      alt="song Pic"
                    />
                    <CardContent className="text-light">
                      <Typography
                        component="div"
                        variant={"h5"}
                        sx={{ fontSize: ipad ? "0.8rem" : "1.25rem" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="text-light"
                        sx={{ fontSize: ipad ? "0.5rem" : "1rem" }}
                      >
                        <VisibilityIcon className="me-3" />
                        {item.views}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="text-light"
                        sx={{ fontSize: ipad ? "0.5rem" : "1rem" }}
                      >
                        <ThumbUpIcon className="me-3 text-danger" />
                        {item.likes}
                      </Typography>
                      <Typography
                        className="text-light mt-1 d-block"
                        variant="caption"
                        sx={{ fontSize: ipad ? "0.5rem" : "1rem" }}
                      >
                        <CreateIcon className="text-warning me-3" />
                        {item.date_created.split("T")[0]}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {props.LikedData ? (
                      <LikeButton
                        songId={item._id}
                        set={props.LikedData.includes(item._id)}
                      />
                    ) : null}
                  </CardActions>
                </Card>
              ))}
            </React.Fragment>
          ) : (
            <Typography variant="h6">No Songs Streamed Yet!</Typography>
          )}
        </Container>
      </div>
    </Container>
  );
}
