import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { Container } from "@mui/system";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FollowButton from "../FollowButton";
import { useMediaQuery } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QueueIcon from "@mui/icons-material/Queue";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LikeButton from "../LikeButton";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip } from "@mui/material";

export default function SearchResult(props) {
  const match = useMediaQuery("(max-width: 768px)");
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
  return (
    <React.Fragment>
      <Box>
        <IconButton
          className="text-light"
          onClick={() => {
            props.changeContent({
              songs: [],
              users: [],
            });
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
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Box>
      {props.searchContent.songs && props.searchContent.songs.length !== 0 ? (
        <div className="d-flex flex-column p-lg-5 p-md-5 p-1 bg-transparent">
          <Box className="mb-5">
            <Typography variant="h4" className="text-center">
              <LibraryMusicIcon className="me-3" />
              Songs
            </Typography>
          </Box>
          <Box
            sx={{ width: "100%" }}
            className="p-lg-5 p-md-5 p-1 rounded shadow-lg"
          >
            <React.Fragment>
              {props.searchContent.songs.map((item, idx) => (
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
                    <CardContent className="text-light mx-4 w-100">
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
                          {props.playlistData.map((playlist, idx) => (
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
                          ))}
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
              ))}
            </React.Fragment>
          </Box>
        </div>
      ) : (
        <Typography variant="h5" className="mt-5 fw-bold text-center">
        <LibraryMusicIcon className="me-3" />No Song Found
        </Typography>
      )}
      {props.searchContent.users && props.searchContent.users.length !== 0 ? (
        <Container
          className="p-1 my-5 rounded shadow-lg bg-transparent"
          sx={{ minHeight: "800px"}}

        >
          <Typography
            variant="h5"
            sx={{ textAlign: match ? "center" : "left" }}
            className="mx-3 my-5"
          >
            <i className="fa-solid fa-fire me-3"></i>
            Artists
          </Typography>
          <Grid container spacing={3} className="justify-content-center" sx={{ marginBottom: "20%"}}>
            {props.searchContent.users.map((item, idx) => (
              <Grid item lg={3} xs={12} key={idx}>
                <Card className="bg-dark rounded m-auto" elevation={10}>
                  <CardActionArea
                    onClick={() => {
                      toggleClick(item._id);
                    }}
                  >
                    {item.userPic ? (
                      <CardMedia
                        component="img"
                        src={`/avatar/userPic/${item.userPic}`}
                        alt="user Pic"
                      />
                    ) : (
                      <Avatar
                        sizes="lg"
                        variant="square"
                        className="w-100"
                        sx={{ padding: "25%" }}
                      >
                        <PersonIcon sx={{ fontSize: "2rem" }} />
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
                  </CardActionArea>
                  <CardActions>
                    {props.followData ? (
                      <FollowButton
                        userId={item._id}
                        set={props.followData.includes(item._id)}
                      />
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography variant="h5" className="mt-5 fw-bold text-center" sx={{minHeight: "300px"}}>
        <i className="fa-solid fa-fire me-3"></i>No Artist Found
        </Typography>
      )}
    </React.Fragment>
  );
}
