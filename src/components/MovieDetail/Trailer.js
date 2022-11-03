import { useState, useEffect, Fragment } from "react";
import YouTube from "react-youtube";

const API_KEY = "96ec8e5f2348abf53ecf12050ca01501";

const Trailer = (props) => {
  const [status, setStatus] = useState(false);
  const [getTrailer, setGetTrailer] = useState(props.movieDetail.backdrop_path); // Set default state of trailer to backdrop

  useEffect(() => {
    const trailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.movieDetail.id}/videos?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong !");
      }

      const getData = await response.json();

      // Filter site = youtube & type = trailer
      let trailerFilter = getData.results.filter((e) => {
        return e.site === "YouTube" && e.type === "Trailer";
      });

      // If cant find type = trailer than filter type = teaser
      if (trailerFilter.length === 0) {
        trailerFilter = getData.results.filter((e) => {
          return e.site === "YouTube" && e.type === "Teaser";
        });
      }

      // If even cant find type = teaser => set back to default
      if (trailerFilter.length === 0) {
        setGetTrailer(props.movieDetail.backdrop_path);
        setStatus(false);
      } else {
        // If find something then pick the first appear
        setGetTrailer(trailerFilter[0]);
        setStatus(true);
      }
    };

    trailer().catch((error) => {
      console.log(error);
    });
  }, [props]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  function onReady(event) {
    event.target.pauseVideo();
  }

  return (
    <Fragment>
      <div>
        {status && (
          <YouTube videoId={getTrailer.key} opts={opts} onReady={onReady} />
        )}
        {!status && (
          <img
            src={`https://image.tmdb.org/t/p/original/${getTrailer}`}
            alt="none"
            width="100%"
            height="400px"
          />
        )}
      </div>
    </Fragment>
  );
};

export default Trailer;
