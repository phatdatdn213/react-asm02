import { Fragment } from "react";

import Trailer from "./Trailer";
import classes from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  const detail = props.detail;
  console.log(detail);

  return (
    <Fragment>
      <div className={classes.frame}>
        <div>
          <h1>{detail.title || detail.name}</h1>
          <hr />
          <h3>Ngày phát hành: {detail.first_air_date}</h3>
          <h3>Đánh giá: {detail.vote_average}/10</h3>
          <p>{detail.overview}</p>
        </div>
        <div>
          <Trailer movieDetail={detail} />
        </div>
      </div>
    </Fragment>
  );
};

export default MovieDetail;
