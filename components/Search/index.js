import React, { useEffect } from "react";
import axios from "axios";

export default function Search(props) {
  const onChange = (e) => {
    props.changeQuery(e.target.value);
  };

  useEffect(() => {
    if (props.query.length > 6) {
      const debounce = setTimeout(() => {
        var searchTerm = props.query;
        var tokens = searchTerm
          .toLowerCase()
          .split(" ")
          .filter(function (token) {
            return token.trim() !== "";
          });
        if (tokens.length) {
          axios.request({
            method: "POST",
            url: "/api/filterSearch",
            data: { token: tokens}
          }).then(res => {
            console.log(res.data);
            props.changeContent(res.data);
          })
          props.toPage({
            account: false,
            setting: false,
            studio: false,
            playlist: false,
            likedSong: false,
            follow: false,
            search: true,
          });
          props.changeContent(props.query);
        }
      }, 1000);
      return () => clearTimeout(debounce);
    }
  }, [props.query]);
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control bg-black search text-light search"
        id="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={onChange}
        value={props.query}
      />
      <span
        className="input-group-text border-0 bg-black px-2"
        id="search-addon"
      >
        <i className="fas fa-search red-shade"></i>
      </span>
    </div>
  );
}
