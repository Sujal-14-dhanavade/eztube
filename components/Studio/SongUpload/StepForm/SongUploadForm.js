import React from "react";
import { Avatar, Alert, Typography, Container, Grid } from "@mui/material";
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
    album: props.album,
    genre: "",
    language: "",
    artist: [],
    producer: [],
    writer: [],
  });
  const [artist, changeArt] = React.useState({ value: "", error: false });
  const [producer, changePro] = React.useState({ value: "", error: false });
  const [writer, changeWri] = React.useState({ value: "", error: false });
  const [error, setError] = React.useState(null);

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
      });
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
      });
  }

  function onChange(e) {
    changeData({ ...songData, [e.target.id]: e.target.value });
  }

  function createSong(e) {
    e.preventDefault();
    if (songData.name === "") {
      setError("Empty Fields");
    } else if (songData.name < 7) {
      setError("Song name should contain more than 7 characters");
    } else {
      setError("Working");
    }
  }

  const handleClick = (e) => {
    changeData({...songData, [e.target.id]: [...songData[e.target.id], artist]});
    if(e.target.id === "artist") changeArt("");
    else if(e.target.id === "producer") changePro("");
    else if(e.target.id === "writer") changeWri("");
  };
  const deleteArt = (e) => {
    var arr = [...songData.artist];
    arr.splice(e.target.value, 1);
    changeData({...songData, artist: [...arr]});
  };
  const deletePro = (e) => {
    var arr = [...songData.producer];
    arr.splice(e.target.value, 1);
    changeData({...songData, producer: [...arr]});
  };
  const deleteWri = (e) => {
    var arr = [...songData.writer];
    arr.splice(e.target.value, 1);
    changeData({...songData, writer: [...arr]});
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
              className="bg-light text-dark rounded register-input-outline w-50 m-auto d-block"
              accept="image/png, image/jpeg"
              onChange={onPicFormChange}
              required
            />

            <button
              className="btn btn-danger mt-5 mx-2"
              name="submit"
              type={"submit"}
              disabled={errorFile}
            >
              Next Step
            </button>
            <a className="btn btn-danger mt-5 mx-2" href="/Ezport">
              Cancel <i class="fa-solid fa-xmark"></i>
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
              className="bg-light text-dark rounded register-input-outline w-50 m-auto d-block"
              accept="audio/mpeg"
              onChange={onAudioFormChange}
              required
            />

            <button
              className="btn btn-danger mt-5"
              name="submit"
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
          <form className="mt-5 text-center" onSubmit={createSong}>
            <input
              className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
              placeholder="Song Name"
              name="name"
              id="name"
              value={songData.name}
              onChange={onChange}
            />
            <div className="form-outline flex-fill mb-0">
              <select
                className="form-select register-input-outline"
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
            <div className="form-outline flex-fill mb-0">
              <select
                className="form-select register-input-outline"
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
            <div className="form-outline flex-fill mb-0">
              <Container sx={{ marginBottom: "10px", backgroundColor: "gray" }}>
                {songData.artist.map((artist, id) => (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                    }}
                  >
                    {artist}
                    <Button value={id} onClick={deleteArt}>
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <Grid>
                <input
                  className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
                  placeholder="Artist..."
                  name="artist"
                  id="artist"
                />
                <button
                  className="btn btn-danger"
                  id="artist"
                  onClick={handleClick}
                >
                  Add Artist
                </button>
              </Grid>
            </div>
            <div className="form-outline flex-fill mb-0">
              <Container sx={{ marginBottom: "10px", backgroundColor: "gray" }}>
                {songData.artist.map((artist, id) => (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                    }}
                  >
                    {artist}
                    <Button value={id} onClick={deleteArt}>
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <Grid>
                <input
                  className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
                  placeholder="Artist..."
                  name="artist"
                  id="artist"
                />
                <button className="btn btn-danger" onClick={onAddArtist}>
                  Add Artist
                </button>
              </Grid>
            </div>
            <div className="form-outline flex-fill mb-0">
              <Container sx={{ marginBottom: "10px", backgroundColor: "gray" }}>
                {songData.artist.map((artist, id) => (
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "0.8rem",
                      display: "inline-block",
                      margin: "5px",
                    }}
                  >
                    {artist}
                    <Button value={id} onClick={deleteArt}>
                      x
                    </Button>
                  </Typography>
                ))}
              </Container>
              <Grid>
                <input
                  className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
                  placeholder="Artist..."
                  name="artist"
                  id="artist"
                />
                <button className="btn btn-danger" onClick={onAddArtist}>
                  Add Artist
                </button>
              </Grid>
            </div>
            <button
              className="btn btn-danger mt-5"
              name="submit"
              type={"submit"}
              disabled={errorFile}
            >
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
