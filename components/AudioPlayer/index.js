import React, { useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Card, CardMedia, CardContent, IconButton, Chip } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

export default function AudioPlayer(props) {
  const [turn, changeTurn] = React.useState(0);
  const [src, changeSrc] = React.useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (props.queue.isChange && props.queue.queue.length !== 0) {
        changeTurn(0);
        changeSrc(props.queue.queue[0].song);
        props.changeQueue({ ...props.queue, isChange: false });
        props.audioRef.current.load();
      } else if (props.audioRef.current) {
        if (
          props.audioRef.current.currentTime >=
            props.audioRef.current.duration - 2 &&
          props.queue.queue.length !== 0
        ) {
          if (turn === props.queue.queue.length - 1) {
            changeTurn(0);
            changeSrc(props.queue.queue[0].song);
            axios.request({
              method: "post",
              url: "/api/viewSong",
              data: { songId: props.queue.queue[turn]._id },
            });
            props.audioRef.current.load();
          } else {
            changeTurn(turn + 1);
            changeSrc(props.queue.queue[turn + 1].song);
            axios.request({
              method: "post",
              url: "/api/viewSong",
              data: { songId: props.queue.queue[turn]._id },
            });
            props.audioRef.current.load();
          }
        }
      }
    }, 1000);
  });
  return (
    <div className="audio">
      {src ? (
        <React.Fragment>
          <Accordion style={{ backgroundColor: "#000" }} className="text-light">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="fw-bold text-danger">
                Now Playing
              </Typography>
              <Typography className="mx-3 fw-bold">
                {props.queue.queue[turn].name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Card
                className="my-2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#000",
                }}
              >
                <CardContent className="d-flex flex-row p-0">
                  <CardMedia
                    component="img"
                    sx={{ width: "30%" }}
                    src={`/avatar/songPic/${props.queue.queue[turn].songPic}`}
                    alt="song Pic"
                  />
                  <CardContent className="text-light">
                    <div id="artistDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Artist</Typography>
                      <div className="mx-5">
                        {props.queue.queue[turn].artist.map((artist, idx) => (
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
                        {props.queue.queue[turn].producer.map((prod, idx) => (
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
                        {props.queue.queue[turn].writer.map((wri, idx) => (
                          <Chip
                            className="bg-danger text-light mx-2"
                            label={wri}
                            key={idx}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ) : null}
      <div className="px-5 d-flex flex-row justify-content-between">
        <audio className="w-75" ref={props.audioRef} controls autoPlay={true}>
          <source src={src ? `/watch/${src}` : ""} type="audio/mpeg" />
        </audio>
        <IconButton
          className="text-light"
          onClick={() => {
            props.changeQueue({ isChange: false, queue: [] });
            changeSrc(null);
            changeTurn(0);
            props.audioRef.current.load();
          }}
        >
          <i class="fa-solid fa-folder-minus text-light me-3" />
          <Typography variant="body1">Clear Queue</Typography>
        </IconButton>
        <IconButton href="#">
          <NavigationIcon className="text-danger" />
        </IconButton>
      </div>
    </div>
  );
}
