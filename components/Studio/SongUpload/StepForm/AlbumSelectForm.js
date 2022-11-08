import React from "react";

export default function AlbumSelectForm(props) {
  return (
    <form className="mt-5 text-center">
      <select
        className="form-select register-input-outline w-50 m-auto"
        id="album"
        name="album"
      >
        <option defaultValue={""}></option>
        {props.userAlbums.map((item, idx) => (
          <option value={item._id}>{item.name}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-danger mt-5 mx-2">
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
    </form>
  );
}
