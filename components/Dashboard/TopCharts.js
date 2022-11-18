import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QueueIcon from "@mui/icons-material/Queue";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import axios from "axios";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LikeButton from "../LikeButton";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function TopCharts(props) {
  const match = useMediaQuery("(max-width: 768px)");
  const ipad = useMediaQuery("(max-width: 1024px)");
  const [recentData, setData] = React.useState(null);
  function onClick(id, songid) {
    axios
      .request({
        method: "POST",
        url: "/api/addSongPlaylist",
        data: { id: id, songid: songid },
      })
      .then((res) => {
        if (res.data.error === true) {
          console.log(res.data.error);
        } else if (res.data.error === false) {
          axios
            .request({
              method: "GET",
              url: "/api/getPlaylist",
            })
            .then((res) => {
              props.changeData(res.data);
            });
        }
      });
  }
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "/api/topChart",
      })
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
  }, []);
  return (
    <Container
      className="p-1 my-5 rounded bg-transparent shadow-lg"
      sx={{ minHeight: "500px"}}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: match ? "center" : "left" }}
        className="mx-3 my-5"
      >
        <TimelineIcon className="me-3" />
        Top Chart
      </Typography>
      {recentData !== null && recentData.length !== 0 ? (
        <div
          id="carouselExampleControls"
          className="carousel slide mt-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {recentData.map((item, idx) => (
              <div
                className={"carousel-item" + (idx === 0 ? " active" : "")}
                key={idx}
              >
                <Card
                  className="my-2"
                  elevation={14}
                  sx={{
                    display: "flex",
                    marginLeft: ipad ? "0%" : "15%",
                    marginRight: ipad ? "0%" : "15%",
                    flexDirection: "column",
                    backgroundColor: "#000",
                  }}
                  key={idx}
                >
                  <CardContent className="d-flex flex-row p-0">
                    <CardMedia
                      component="img"
                      sx={{ width: "40%" }}
                      src={`/avatar/songPic/${item.songPic}`}
                      alt="song Pic"
                    />
                    <CardContent className="text-light mx-4 w-100">
                      <Typography
                        component="div"
                        variant="h5"
                        className="mb-2"
                        sx={{ fontSize: match ? "1rem" : "1.25rem" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="text-light mb-2" 
                        sx={{ fontSize: match ? "0.5rem" : "1rem" }}
                      >
                        <VisibilityIcon className="me-3" />
                        {item.views}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="text-light mb-2"
                        sx={{ fontSize: match ? "0.5rem" : "1rem" }}
                      >
                        <ThumbUpIcon className="me-3 text-danger" />
                        {item.likes}
                      </Typography>
                      <IconButton
                        className="text-light"
                        size="small"
                        onClick={() => {
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
                    <CardContent className="w-100 d-flex justify-content-end">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary rounded-circle"
                          type="button"
                          id={`dropdownMenuButton${idx}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ backgroundColor: "#000", border: "none" }}
                        >
                          <MoreVertIcon />
                        </button>
                        <ul
                          className="dropdown-menu bg-dark"
                          aria-labelledby={`dropdownMenuButton${idx}`}
                          style={{height: "100%", overflowY: "auto"}}
                        >
                          <li>
                            <a
                              className="dropdown-item text-light"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                props.changeQueue({
                                  isChange: false,
                                  queue: [...props.queue.queue, item],
                                });
                              }}
                            >
                              <QueueIcon className="text-light" /> Add to Queue
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider text-light" />
                          </li>
                          <li>
                            <div
                              className="dropdown-item text-light nohover"
                              style={{ cursor: "default" }}
                            >
                              <PlaylistAddIcon className="text-light" /> Add to
                              Playlist
                            </div>
                          </li>
                          {props.playlistData
                            ? props.playlistData.map((playlist, idx) => (
                                <li key={idx}>
                                  <a
                                    className="dropdown-item text-light"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      onClick(playlist._id, item._id);
                                    }}
                                  >
                                    <QueueMusicIcon
                                      className="me-3"
                                      style={{ color: "gray" }}
                                    />
                                    {playlist.playlistName}
                                  </a>
                                </li>
                              ))
                            : null}
                          ))
                        </ul>
                      </div>
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
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            style={{ display: match ? "none" : "block" }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            style={{ display: match ? "none" : "block" }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <Typography>No Top Charts</Typography>
      )}
    </Container>
  );
}
