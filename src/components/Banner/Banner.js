import { useState, Fragment } from "react";

import useGetData from "../CustomHook/use-GetData";
import classes from "./Banner.module.css";

const Banner = () => {
  const [url, setUrl] = useState({});

  const API_KEY = "96ec8e5f2348abf53ecf12050ca01501";
  const link = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`;

  useGetData(link, bannerHandle);

  function bannerHandle(e) {
    let random = Math.floor(Math.random() * e.results.length - 1); // Chose a random film
    let pic = e.results[random].backdrop_path;
    let bannerBackdrop = `https://image.tmdb.org/t/p/original/${pic}`;
    let bannerName = e.results[random].name;
    let bannerOverview = e.results[random].overview;

    setUrl({
      bannerBackdrop,
      bannerName,
      bannerOverview,
    });
  }

  return (
    <Fragment>
      <div className={classes.background}>
        <img src={url.bannerBackdrop} alt="none" className={classes.avatar} />
        <h1 className={classes.name}>{url.bannerName}</h1>
        <div className={classes.content}>
          <button className={classes.button}>Play</button>
          <button className={classes.button}>My List</button>
          <div className={classes.description_wrapper}>
            <p className={classes.description}>{url.bannerOverview}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
