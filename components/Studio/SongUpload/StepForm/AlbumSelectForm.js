import React from "react";
import { Alert } from "@mui/material";

export default function AlbumSelectForm(props) {

  const [index, onIndexChange] = React.useState(-1);
  const [error, setError] = React.useState(null);

  function onSubmit() {
    if (index === -1) {
      setError("Please Select a Album");
    } else {
      const { _id, name } = props.userAlbums[index];
      props.album({
        id: _id,
        album: name,
      });
      props.next();
    }
  }
  return (
    <div className="mt-5 text-center">
      <select
        className="form-select register-input-outline w-50 m-auto"
        id="album"
        name="album"
        value={index}
        onChange={(e) => {
          onIndexChange(e.target.value);
        }}
      >
        <option defaultValue={-1}>Select a option</option>
        {props.userAlbums.map((item, idx) => (
          <option key={idx} value={idx}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="d-flex justify-content-center mt-5 mb-3 mb-lg-4">
        {error ? <Alert severity="error">{error}</Alert> : null}
      </div>
      <button onClick={onSubmit} className="btn btn-danger mt-5 mx-2">
        Select Album
      </button>
      <a
        className="btn btn-danger mt-5 mx-2"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.toChange(false);
        }}
      >
        Create a Album
      </a>
    </div>
  );
}
