import React from "react";
import { useDispatch } from "react-redux";

function FilmItem({ film }) {
  return (
    <div className="film">
      <h2>{film.title}</h2>
    </div>
  );
}

export default FilmItem;
