import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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

export default function List(props) {
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
  return (
    <Box
      sx={{ width: "100%" }}
      className="bg-dark p-lg-5 p-md-5 p-1 rounded shadow-lg"
    >
      {props.songListData.length === 0 ? (
        <Typography variant="h5" className="text-center">
          No Releases Yet!!
        </Typography>
      ) : (
        <React.Fragment>
          {props.songListData.map((item, idx) => (
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
                  <Typography component="div" variant="h6">
                    {props.data.username}
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
      )}
    </Box>
  );
}
