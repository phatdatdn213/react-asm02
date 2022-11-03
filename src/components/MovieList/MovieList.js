import { useState } from "react";

import useGetData from "../CustomHook/use-GetData";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const [movieArr, setMovieArr] = useState([]);

  let isNetflixOriginals = props.category === "Original";

  useGetData(props.link, arrayHandle);

  function arrayHandle(e) {
    setMovieArr(e.results);
  }

  function clickHandle(e) {
    const [movieData] = movieArr.filter((item) => +item.id === +e.target.id);
    props.click(movieData);
  }

  function renderOtherMovieData(e) {
    const category = e.target.parentElement.parentElement.id;
    props.clickOtherMovie(category);
  }

  const list = movieArr.map((item) => {
    return (
      <img
        key={item.id}
        id={item.id}
        src={`https://image.tmdb.org/t/p/original/${
          isNetflixOriginals ? item.poster_path : item.backdrop_path
        }`}
        alt="none"
        className={classes.avatar}
        onClick={clickHandle}
      />
    );
  });

  return (
    <div id={props.category} onClick={renderOtherMovieData}>
      <h2 className={classes.category}>{props.category}</h2>
      <div className={classes.cover}>{list}</div>
    </div>
  );
};

export default MovieList;
