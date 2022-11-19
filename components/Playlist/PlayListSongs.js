import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import LikeButton from "../LikeButton";

export default function playListSongs(props) {
  const [songData, changeSongData] = React.useState(null);
  useEffect(() => {
    axios
      .request({
        method: "POST",
        url: "/api/getSongPlaylist",
        data: { songs: props.playlist.songs },
      })
      .then((res) => {
        if (res.data.songs) {
          changeSongData(res.data.songs);
        }
      });
  }, []);
  return (
    <React.Fragment>
      <Box>
        <IconButton
          className="text-light"
          onClick={() => {
            props.changePage(true);
            props.changePlaylist(null);
          }}
        >
          <ArrowBackIosNewIcon className="text-light" />{" "}
          <Typography variant="button">Playlists</Typography>
        </IconButton>
      </Box>
      <Card
        sx={{ backgroundColor: "#000" }}
        className="w-50 mx-auto text-light rounded-pill shadow-lg d-flex flex-lg-row flex-md-row flex-column"
      >
        <CardMedia
          component="img"
          className="w-50 mx-lg-0 mx-md-0 mx-auto rounded"
          image={`/avatar/playlistPic/${props.playlist.playlistPic}`}
          alt="playlist Pic"
        />
        <CardContent>
          <Typography className="text-light" variant="h5">
            {props.playlist.playlistName}
          </Typography>
          <Typography className="text-light mt-1" variant="body2">
            <LibraryMusicIcon className="text-danger me-3" />
            {props.playlist.songs.length} Songs
          </Typography>
          <Typography className="text-light mt-1 d-block" variant="caption">
            <CreateIcon className="text-warning me-3" />
            {props.playlist.date_created.split("T")[0]}
          </Typography>
          <IconButton
            className="text-light"
            size="small"
            onClick={async () => {
              if (!songData) {
                props.changeQueue({ isChange: false, queue: [] });
                props.changeSrc(null);
                props.changeTurn(0);
                props.audioRef.current.load();
              } else {
                props.changeQueue({
                  isChange: true,
                  queue: songData,
                });
              }
            }}
          >
            <PlayArrowIcon className="text-light fs-1 playButton" />
          </IconButton>
        </CardContent>
      </Card>
      <Box
        sx={{ width: "100%", marginBottom: "100px" }}
        className="bg-dark w-75 mx-auto mt-2 p-lg-5 p-md-5 p-1 rounded shadow-lg"
      >
        {props.playlist.songs.length !== 0 && songData !== null ? (
          <React.Fragment>
            {songData.map((item, idx) => (
              <Card
                className="my-2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#000",
                }}
                key={idx}
              >
                <CardContent className="d-flex flex-row p-0">
                  <CardMedia
                    component="img"
                    sx={{ width: "30%" }}
                    src={`/avatar/songPic/${item.songPic}`}
                    alt="song Pic"
                  />
                  <CardContent className="text-light mx-4">
                    <Typography component="div" variant="h5">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      className="text-light"
                    >
                      <VisibilityIcon className="me-3" />
                      {item.views}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      className="text-light"
                    >
                      <ThumbUpIcon className="me-3 text-danger" />
                      {item.likes}
                    </Typography>
                    <Typography
                      className="text-light mt-1 d-block"
                      variant="caption"
                    >
                      <CreateIcon className="text-warning me-3" />
                      {item.date_created.split("T")[0]}
                    </Typography>
                    <IconButton
                      className="text-light"
                      size="small"
                      onClick={async () => {
                        props.changeQueue({
                          isChange: true,
                          queue: [item, ...props.queue.queue],
                        });
                      }}
                    >
                      <PlayArrowIcon className="text-light fs-1 playButton" />
                    </IconButton>
                    {props.LikedData ? (
                      <LikeButton
                        songId={item._id}
                        set={props.LikedData.includes(item._id)}
                      />
                    ) : null}
                  </CardContent>
                </CardContent>
                <Accordion
                  sx={{ backgroundColor: "#000" }}
                  className="text-light p-0"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="text-light" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  />
                  <AccordionDetails>
                    <div id="artistDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Artist</Typography>
                      <div className="mx-5">
                        {item.artist.map((artist, idx) => (
                          <Chip
                            className="bg-danger text-light mx-2"
                            label={artist}
                            key={idx}
                          />
                        ))}
                      </div>
                    </div>
                    <div id="prodDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Producer</Typography>
                      <div className="mx-5">
                        {item.producer.map((prod, idx) => (
                          <Chip
                            className="bg-danger text-light mx-2"
                            label={prod}
                            key={idx}
                          />
                        ))}
                      </div>
                    </div>
                    <div id="writerDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Writer</Typography>
                      <div className="mx-5">
                        {item.writer.map((wri, idx) => (
                          <Chip
                            className="bg-danger text-light mx-2"
                            label={wri}
                            key={idx}
                          />
                        ))}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </Card>
            ))}
          </React.Fragment>
        ) : (
          <Typography variant="h6">No Songs Added Yet!</Typography>
        )}
      </Box>
    </React.Fragment>
  );
}
