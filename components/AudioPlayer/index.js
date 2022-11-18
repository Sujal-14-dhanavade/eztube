import React, { useEffect } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  useMediaQuery,
} from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import LikeButton from "../LikeButton";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
export default function AudioPlayer(props) {
  const match = useMediaQuery("(min-width: 768px)");
  const nextSong = () => {
    if (props.turn === props.queue.queue.length - 1) {
      props.changeTurn(0);
      props.changeSrc(props.queue.queue[0].song);
      axios.request({
        method: "post",
        url: "/api/viewSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      axios.request({
        method: "post",
        url: "/api/recentSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      props.audioRef.current.load();
    } else {
      props.changeTurn(props.turn + 1);
      props.changeSrc(props.queue.queue[props.turn + 1].song);
      axios.request({
        method: "post",
        url: "/api/viewSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      axios.request({
        method: "post",
        url: "/api/recentSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      props.audioRef.current.load();
    }
  };

  const prevSong = () => {
    if (props.turn === 0) {
      props.changeTurn(props.queue.queue.length - 1);
      props.changeSrc(props.queue.queue[props.queue.queue.length - 1].song);
      axios.request({
        method: "post",
        url: "/api/viewSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      axios.request({
        method: "post",
        url: "/api/recentSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      props.audioRef.current.load();
    } else {
      props.changeTurn(props.turn - 1);
      props.changeSrc(props.queue.queue[props.turn - 1].song);
      axios.request({
        method: "post",
        url: "/api/viewSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      axios.request({
        method: "post",
        url: "/api/recentSong",
        data: { songId: props.queue.queue[props.turn]._id },
      });
      props.audioRef.current.load();
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if (props.queue.isChange && props.queue.queue.length !== 0) {
        props.changeTurn(0);
        props.changeSrc(props.queue.queue[0].song);
        props.changeQueue({ ...props.queue, isChange: false });
        props.audioRef.current.load();
      } else if (props.audioRef.current) {
        if (
          props.audioRef.current.currentTime >=
            props.audioRef.current.duration - 2 &&
          props.queue.queue.length !== 0
        ) {
          nextSong();
        }
      }
    }, 1000);
  });
  return (
    <div className="audio">
      {props.src ? (
        <React.Fragment>
          <Accordion style={{ backgroundColor: "#000" }} className="text-light">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="fw-bold text-danger">
                Now Playing
              </Typography>
              <Typography className="mx-3 fw-bold">
                {props.queue.queue[props.turn].name}
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
                    src={`/avatar/songPic/${
                      props.queue.queue[props.turn].songPic
                    }`}
                    alt="song Pic"
                  />
                  <CardContent className="text-light">
                    <div id="artistDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Artist</Typography>
                      <div className="mx-5">
                        {props.queue.queue[props.turn].artist.map(
                          (artist, idx) => (
                            <Chip
                              className="bg-danger text-light mx-2"
                              label={artist}
                              key={idx}
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div id="prodDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Producer</Typography>
                      <div className="mx-5">
                        {props.queue.queue[props.turn].producer.map(
                          (prod, idx) => (
                            <Chip
                              className="bg-danger text-light mx-2"
                              label={prod}
                              key={idx}
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div id="writerDet" className="d-flex flex-row my-3">
                      <Typography className="fw-bold">Writer</Typography>
                      <div className="mx-5">
                        {props.queue.queue[props.turn].writer.map(
                          (wri, idx) => (
                            <Chip
                              className="bg-danger text-light mx-2"
                              label={wri}
                              key={idx}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </CardContent>
              </Card>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ) : null}
      <div className="px-5 d-flex flex-lg-row flex-md-row flex-column justify-content-between">
        <audio
          style={{ width: match ? "60%" : "100%" }}
          ref={props.audioRef}
          controls
          autoPlay={true}
        >
          <source
            src={props.src ? `/watch/${props.src}` : ""}
            type="audio/mpeg"
          />
        </audio>
        <div
          id="controls"
          className="d-flex justify-content-center align-items-center"
        >
          {props.queue.queue.length !== 0 ? (
            <>
              <IconButton className="text-info" onClick={prevSong}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton className="text-info" onClick={nextSong}>
                <SkipNextIcon />
              </IconButton>
            </>
          ) : null}

          <IconButton
            className="text-light mx-2"
            onClick={() => {
              props.changeQueue({ isChange: false, queue: [] });
              props.changeSrc(null);
              props.changeTurn(0);
              props.audioRef.current.load();
            }}
          >
            <i className="fa-solid fa-folder-minus text-light me-3" />
            <Typography variant="body1">Clear Queue</Typography>
          </IconButton>
          {props.LikedData && props.queue.queue.length !== 0 ? (
            <LikeButton
              songId={props.queue.queue[props.turn]._id}
              set={props.LikedData.includes(props.queue.queue[props.turn]._id)}
            />
          ) : null}
          <IconButton href="#" className="mx-2">
            <NavigationIcon className="text-danger" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
