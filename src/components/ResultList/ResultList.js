import { useState } from "react";

import classes from "./ResultList.module.css";
import useGetData from "../CustomHook/use-GetData";

const API_KEY = "96ec8e5f2348abf53ecf12050ca01501";

const ResultList = (props) => {
  const [movie, setMovie] = useState([]);

  useGetData(
    props.passValue !== ""
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.passValue}`
      : "",
    // : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=Thor`,
    searchHandle,
    props.passValue
  );

  function searchHandle(e) {
    setMovie(e.results);
    console.log(movie);
  }

  function clickHandle(e) {
    const movieDetail = movie.filter((item) => {
      return item.id === +e.target.id;
    });

    // Get detail of the first one appear
    props.getDetail(movieDetail[0]);
  }

  const list = movie.map((item) => {
    return (
      <img
        key={item.id}
        id={item.id}
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        alt="none"
        className={classes.poster}
        onClick={clickHandle}
      />
    );
  });

  return <div className={classes.frame}>{list}</div>;
};

export default ResultList;
