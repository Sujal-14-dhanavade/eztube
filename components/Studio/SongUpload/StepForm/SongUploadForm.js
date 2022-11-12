import React from "react";
import { Avatar, Alert } from "@mui/material";
import axios from "axios";

export default function SongUploadForm(props) {
  const [image, onChangeImg] = React.useState(null);
  const [imgfile, changeFile] = React.useState(null);
  const [songData, changeData] = React.useState({
    songPic: null,
    name: "",
  });

  const [error, setError] = React.useState(null);
  function onFormChange(e) {
    var file = e.target.files[0];
    changeFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onChangeImg(reader.result);
    };
  }

  function onSubmit(e) {
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
        changeData({ ...albumData, albumPic: res.data.albumPicId });
      });
  }

  function onChange(e) {
    changeData({ ...albumData, [e.target.id]: e.target.value });
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
  return (

        <form className="mt-5" onSubmit={createSong}>
          <input
            className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
            placeholder="Song Name"
            name="name"
            id="name"
            value={songData.name}
            onChange={onChange}
          />
          <div className="d-flex justify-content-center mt-5 mb-3 mb-lg-4">
            {error ? <Alert severity="error">{error}</Alert> : null}
          </div>
          <button type="submit" className="btn btn-danger mt-5 mx-2">
            Create Song
          </button>
        </form>
  );
}
