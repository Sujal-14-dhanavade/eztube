import React from "react";
import { Avatar, Fab, Alert } from "@mui/material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import $ from "jQuery";

export default function Playlistform(props) {
  const [image, onChangeImg] = React.useState(null);
  const [imgfile, changeFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [playListName, setName] = React.useState("");

  function onFormChange(e) {
    var file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setError("");
      changeFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onChangeImg(reader.result);
      };
    } else {
      setError("Please select png or jpeg type image");
    }
  }

  function createPlaylist() {
    if (playListName === "" || imgfile === null) {
      setError("Empty Fields !!!");
    } else if (playListName.length < 8) {
      setError("Name should have more than 7 characters");
    } else {
      const fd = new FormData();
      fd.append("playlistPicFile", imgfile, imgfile.name);
      axios
        .request({
          method: "POST",
          url: "/api/playlistPicUpload",
          data: fd,
        })
        .then((res) => {
          axios
            .request({
              method: "POST",
              url: "/api/createPlaylist",
              data: {
                playListName: playListName,
                playlistPic: res.data.file,
              },
            })
            .then((res) => {
              if (!res.data.error) {
                onChangeImg(null);
                changeFile(null);
                setName("");
                $("#file").val("");
                setError("");
                axios
                  .request({
                    method: "GET",
                    url: "/api/getPlaylist",
                  })
                  .then((res) => {
                    props.changeData(res.data);
                  });
              } else {
                setError("Server Error");
              }
            });
        });
    }
  }

  return (
    <Container
      sx={{ backgroundColor: "#000" }}
      className="w-50 py-5 rounded-pill shadow-lg d-flex flex-lg-row flex-md-row flex-column justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-center mb-lg-0 mb-md-0 mb-3">
        {image !== null ? (
          <Avatar
            src={image}
            alt="playlist pic"
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Avatar alt="playlist pic" sx={{ width: 100, height: 100 }}>
            <QueueMusicIcon sx={{ fontSize: "50px" }} />
          </Avatar>
        )}
      </div>
      <div className="px-3">
        <input
          type="file"
          name="playlistPicFile"
          id="file"
          className="bg-light text-dark rounded-pill d-block w-100 mb-2 text-center"
          accept="image/png, image/jpeg"
          onChange={onFormChange}
        />
        <input
          className="bg-light rounded-pill d-block w-100 text-center mb-2"
          placeholder="Playlist Name"
          name="name"
          id="name"
          value={playListName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {error ? (
          <Alert className="rounded-pill" severity="error">
            {error}
          </Alert>
        ) : null}
      </div>
      <div className="mt-3 mt-lg-0 mt-md-0">
        <Fab size="small" color="error" onClick={createPlaylist}>
          <AddIcon sx={{ fontSize: "2rem" }} />
        </Fab>
      </div>
    </Container>
  );
}
