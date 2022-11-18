import React from "react";
import { Avatar, Alert, Typography, Container, Button } from "@mui/material";
import axios from "axios";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
const languages = require("language-list")();

//  three stages pic -> song -> register details
export default function SongUploadForm(props) {
  const genre = [
    "Pop",
    "Hip-Hop",
    "Rock",
    "EDM",
    "Latin",
    "Lofi",
    "Indie and Alternative",
    "Classical",
    "Country",
    "Metal",
  ];
  const [image, onChangeImg] = React.useState(null);
  const [imgfile, changeFile] = React.useState(null);
  const [songPicId, changePicId] = React.useState(null);
  const [audioFile, changeAudioFile] = React.useState(null);
  const [audioId, changeAudioId] = React.useState(null);
  const [errorFile, setErrorFile] = React.useState(false);
  const [songData, changeData] = React.useState({
    name: "",
    song: null,
    songPic: null,
    album: props.album.id,
    genre: "",
    language: "",
    artist: [],
    producer: [],
    writer: [],
  });
  const [artist, changeArt] = React.useState("");
  const [producer, changePro] = React.useState("");
  const [writer, changeWri] = React.useState("");
  const [error, setError] = React.useState(null);

  function IsEmpty() {
    if (
      songData.name === "" ||
      songData.genre === "" ||
      songData.language === ""
    ) {
      return true;
    } else if (
      songData.artist.length === 0 ||
      songData.producer.length === 0 ||
      songData.writer.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  function onPicFormChange(e) {
    var file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setErrorFile(false);
      changeFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onChangeImg(reader.result);
      };
    } else {
      setErrorFile(true);
    }
  }

  function onSubmitPic(e) {
    e.preventDefault();
    if(imgfile) {
      const fd = new FormData();
    fd.append("songPicFile", imgfile, imgfile.name);

    axios
      .request({
        method: "POST",
        url: "/api/songPicUpload",
        data: fd,
      })
      .then((res) => {
        changePicId(res.data.file);
        setErrorFile(false);
        changeData({ ...songData, songPic: res.data.file });
      });
    }else {
      setErrorFile(true);
    }
    
  }

  function onAudioFormChange(e) {
    var file = e.target.files[0];
    if (file.type === "audio/mpeg") {
      setErrorFile(false);
      changeAudioFile(file);
    } else {
      setErrorFile(true);
    }
  }

  function onSubmitAudio(e) {
    e.preventDefault();
    if (audioFile !== null) {
      const fd = new FormData();
      fd.append("audioFile", audioFile, audioFile.name);

      axios
        .request({
          method: "POST",
          url: "/api/audioUpload",
          data: fd,
        })
        .then((res) => {
          changeAudioId(res.data.file);
          setErrorFile(false);
          changeData({ ...songData, song: res.data.file });
        });
    } else {
      setErrorFile(true);
    }
  }

  function onChange(e) {
    changeData({ ...songData, [e.target.id]: e.target.value });
  }

  function createSong(e) {
    e.preventDefault();
    if (IsEmpty()) {
      setError("Empty Fields");
    } else if (songData.name.length < 7) {
      setError("Song name should contain more than 6 characters");
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/addSong",
          data: songData,
        })
        .then((res) => {
          if (res.data.keyValue) {
            if (res.data.keyValue.name) {
              setError("Song Name already used!!!");
            }
          } else if (res.data._id) {
            props.toPage({
              account: false,
              setting: false,
              studio: false,
              playlist: false,
              likedSong: false,
              follow: false,
              search: false
            });
          } else {
            setError("Server Error");
          }
        });
    }
  }

  const handleClick = (e) => {
    if (e.target.id === "artist") {
      if (artist === "") setError("Empty Field for artist");
      else {
        changeData({
          ...songData,
          artist: [...songData.artist, artist],
        });
        changeArt("");
        setError("");
      }
    } else if (e.target.id === "producer") {
      if (producer === "") setError("Empty Field for producer");
      else {
        changeData({
          ...songData,
          producer: [...songData.producer, producer],
        });
        changePro("");
        setError("");
      }
    } else if (e.target.id === "writer") {
      if (writer === "") setError("Empty Field for writer");
      else {
        changeData({
          ...songData,
          writer: [...songData.writer, writer],
        });
        changeWri("");
        setError("");
      }
    }
  };

  const onChangeArt_Pro_Wri = (e) => {
    if (e.target.id === "artist") {
      changeArt(e.target.value);
    } else if (e.target.id === "producer") {
      changePro(e.target.value);
    } else if (e.target.id === "writer") {
      changeWri(e.target.value);
    }
  };
  const deleteArt = (e) => {
    var arr = [...songData.artist];
    arr.splice(e.target.value, 1);
    changeData({ ...songData, artist: [...arr] });
  };
  const deletePro = (e) => {
    var arr = [...songData.producer];
    arr.splice(e.target.value, 1);
    changeData({ ...songData, producer: [...arr] });
  };
  const deleteWri = (e) => {
    var arr = [...songData.writer];
    arr.splice(e.target.value, 1);
    changeData({ ...songData, writer: [...arr] });
  };
  return (
    <div>
      {songPicId === null ? (
        <div>
          <div className="d-flex justify-content-center mb-5">
            {image !== null ? (
              <Avatar
                variant="rounded"
                src={image}
                alt="song Pic"
                className="shadow-lg"
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar
                variant="rounded"
                alt="user pic"
                sx={{ width: 100, height: 100 }}
              >
                <MusicNoteIcon sx={{ fontSize: "50px" }} />
              </Avatar>
            )}
          </div>
          <form className="mt-5 text-center" onSubmit={onSubmitPic}>
            <input
              type="file"
              name="songPicFile"
              className="bg-light text-dark rounded register-input-outline w-75 m-auto d-block"
              accept="image/png, image/jpeg"
              onChange={onPicFormChange}
              required
            />

            <button
              className="btn btn-danger mt-5 mx-2"
              type={"submit"}
              disabled={errorFile}
            >
              Next Step
            </button>
            <a className="btn btn-danger mt-5 mx-2" href="/Ezport">
              Cancel <i className="fa-solid fa-xmark"></i>
            </a>
            {errorFile ? (
              <Alert className="m-auto text-center mt-3" severity="error">
                Please Upload jpeg/ png file types for Thumbnail
              </Alert>
            ) : null}
          </form>
        </div>
      ) : audioId === null ? (
        <div>
          <div className="d-flex justify-content-center mb-5">
            <Typography variant="h5">Upload Your Song</Typography>
          </div>
          <form className="mt-5 text-center" onSubmit={onSubmitAudio}>
            <input
              type="file"
              name="audioFile"
              className="bg-light text-dark rounded register-input-outline w-75 m-auto d-block"
              accept="audio/mpeg"
              onChange={onAudioFormChange}
              required
            />

            <button
              className="btn btn-danger mt-5"
              type={"submit"}
              disabled={errorFile}
            >
              Next Step
            </button>
            {errorFile ? (
              <Alert className="m-auto text-center mt-3" severity="error">
                Please Upload mp3 file types for Song
              </Alert>
            ) : null}
          </form>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-center mb-5">
            <Typography variant="h5">Details Regarding Song</Typography>
          </div>
          <form
            className="mt-5 text-center d-flex flex-column"
            onSubmit={createSong}
          >
            <div className="form-outline flex-fill my-4">
              <input
                className="bg-light rounded register-input-outline w-75 m-auto p-2 text-center d-block"
                placeholder="Song Name"
                name="name"
                id="name"
                value={songData.name}
                onChange={onChange}
              />
              <label className="form-label" htmlFor="name">
                Song Name
              </label>
            </div>
            <div className="form-outline flex-fill my-4">
              <select
                className="form-select register-input-outline w-75 m-auto text-center"
                id="genre"
                name="genre"
                value={songData.genre}
                onChange={onChange}
              >
                <option defaultValue={""}></option>
                {genre.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="genre">
                Genre
              </label>
            </div>
            <div className="form-outline flex-fill my-4">
              <select
                className="form-select register-input-outline w-75 m-auto text-center"
                id="language"
                name="language"
                value={songData.language}
                onChange={onChange}
              >
                <option defaultValue={""}></option>
                {languages.getData().map((item, idx) => (
                  <option key={idx} value={item.language}>
                    {item.language}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="language">
                Language
              </label>
            </div>
            <div className="form-outline flex-fill my-4">
              <Container
                className="w-75 mx-auto my-3 rounded"
                sx={{ marginBottom: "10px", backgroundColor: "gray" }}
              >
                {songData.artist.map((artist, id) => (
                  <Typography
                    variant="h6"
                    className="rounded text-center p-1 fw-bold"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                      color: "white",
                      backgroundColor: "#FF0000",
                    }}
                  >
                    {artist}
                    <Button
                      className="p-0 text-light"
                      value={id}
                      onClick={deleteArt}
                    >
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <div className="d-flex flex-row justify-content-center">
                <input
                  className="bg-light rounded register-input-outline w-75 p-2 text-center d-block"
                  placeholder="Artist..."
                  name="artist"
                  id="artist"
                  value={artist}
                  onChange={onChangeArt_Pro_Wri}
                />
                <a className="btn btn-danger" id="artist" onClick={handleClick}>
                  Add Artist
                </a>
              </div>
            </div>
            <div className="form-outline flex-fill my-4">
              <Container
                className="w-75 mx-auto my-3 rounded"
                sx={{ margin: "10px", backgroundColor: "gray" }}
              >
                {songData.producer.map((producer, id) => (
                  <Typography
                    variant="h6"
                    className="rounded text-center p-1 fw-bold shadow"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                      color: "white",
                      backgroundColor: "#FF0000",
                    }}
                  >
                    {producer}
                    <Button
                      className="p-0 text-light"
                      value={id}
                      onClick={deletePro}
                    >
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <div className="d-flex flex-row justify-content-center">
                <input
                  className="bg-light rounded register-input-outline w-75 p-2 text-center d-block"
                  placeholder="Producer..."
                  name="producer"
                  id="producer"
                  value={producer}
                  onChange={onChangeArt_Pro_Wri}
                />
                <a
                  className="btn btn-danger"
                  id="producer"
                  onClick={handleClick}
                >
                  Add Producer
                </a>
              </div>
            </div>
            <div className="form-outline flex-fill my-4">
              <Container
                className="w-75 mx-auto my-3 rounded"
                sx={{ marginBottom: "10px", backgroundColor: "gray" }}
              >
                {songData.writer.map((writer, id) => (
                  <Typography
                    variant="h6"
                    className="rounded text-center p-1 fw-bold shadow"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                      color: "white",
                      backgroundColor: "#FF0000",
                    }}
                  >
                    {writer}
                    <Button
                      className="p-0 text-light"
                      value={id}
                      onClick={deleteWri}
                    >
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <div className="d-flex flex-row justify-content-center">
                <input
                  className="bg-light rounded register-input-outline w-75 p-2 text-center d-block"
                  placeholder="Writer..."
                  name="writer"
                  id="writer"
                  value={writer}
                  onChange={onChangeArt_Pro_Wri}
                />
                <a className="btn btn-danger" id="writer" onClick={handleClick}>
                  Add Writer
                </a>
              </div>
            </div>
            <button className="btn btn-danger mt-5 w-50 m-auto" type={"submit"}>
              Create Song
            </button>
            {error ? (
              <Alert className="m-auto text-center mt-3" severity="error">
                {error}
              </Alert>
            ) : null}
          </form>
        </div>
      )}
    </div>
  );
}
