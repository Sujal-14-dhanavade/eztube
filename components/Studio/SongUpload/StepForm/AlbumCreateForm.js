import React from "react";
import { Avatar, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

export default function AlbumCreateForm(props) {
  const [image, onChangeImg] = React.useState(null);
  const [imgfile, changeFile] = React.useState(null);
  const [errorFile, setErrorFile] = React.useState(false); 
  const [albumData, changeData] = React.useState({
    albumPic: null,
    name: "",
  });

  const [error, setError] = React.useState(null);
  function onFormChange(e) {
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

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("albumPicFile", imgfile, imgfile.name);

    axios
      .request({
        method: "POST",
        url: "/api/albumPicUpload",
        data: fd,
      })
      .then((res) => {
        changeData({ ...albumData, albumPic: res.data.albumPicId });
        
      });
  }

  function onChange(e) {
    changeData({ ...albumData, [e.target.id]: e.target.value });
  }

  function createAlbum(e) {
    e.preventDefault();
    if (albumData.name === "") {
      setError("Empty Fields");
    } else if (albumData.name.length < 7) {
      setError("Album name should contain more than 7 characters");
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/createAlbum",
          data: albumData
        })
        .then((res) => {
          if (res.data.keyValue) {
            if (res.data.keyValue.name) {
              setError("Album already exists!!!");
            }
          } else {
            props.album({
              id: res.data._id,
              album: res.data.name,
            });
            props.next();
          }
        });
    }
  }
  return (
    <div>
      {albumData.albumPic ? (
        <form className="mt-5 text-center" onSubmit={createAlbum}>
          <input
            className="bg-light rounded register-input-outline w-50 m-auto p-2 text-center d-block"
            placeholder="Album Name"
            name="name"
            id="name"
            value={albumData.name}
            onChange={onChange}
          />
          <div className="d-flex justify-content-center mt-5 mb-3 mb-lg-4">
            {error ? <Alert severity="error">{error}</Alert> : null}
          </div>
          <button type="submit" className="btn btn-danger mt-5 mx-2">
            Create Album
          </button>
        </form>
      ) : (
        <>
          <div className="d-flex justify-content-center mb-5">
            {image !== null ? (
              <Avatar
                src={image}
                alt="album pic"
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar alt="user pic" sx={{ width: 100, height: 100 }}>
                <PersonIcon sx={{ fontSize: "50px" }} />
              </Avatar>
            )}
          </div>
          <form className="mt-5 text-center" onSubmit={onSubmit}>
            <input
              type="file"
              name="albumPicFile"
              className="bg-light text-dark rounded register-input-outline w-50 m-auto d-block"
              accept="image/png, image/jpeg"
              onChange={onFormChange}
              required
            />

            <button
              className="btn btn-danger mt-5 mx-2"
              name="submit"
              type={"submit"}
              disabled= {errorFile}
            >
              Next Step
            </button>
            <a
              className="btn btn-danger mt-5 mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.toChange(true);
              }}
            >
              Choose already created album
            </a>
            {(errorFile) ? <Alert className="m-auto text-center mt-3" severity="error">Please Upload jpeg/ png file types for Avatar</Alert>: null}
          </form>
        </>
      )}
    </div>
  );
}
