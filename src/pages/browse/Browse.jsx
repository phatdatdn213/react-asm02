import { useState, Fragment } from "react";

import Banner from "../../components/Banner/Banner";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import MovieList from "../../components/MovieList/MovieList";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Browse.module.css";

const API_KEY = "96ec8e5f2348abf53ecf12050ca01501";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
const api = [
  {
    link: `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`,
    category: "Original",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchTrending}`,
    category: "Xu hướng",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchTopRated}`,
    category: "Xếp hạng cao",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchActionMovies}`,
    category: "Hành động",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchComedyMovies}`,
    category: "Hài",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchHorrorMovies}`,
    category: "Kinh dị",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchRomanceMovies}`,
    category: "Lãng mạn",
  },
  {
    link: `https://api.themoviedb.org/3${requests.fetchDocumentaries}`,
    category: "Tài liệu",
  },
];

function Browse() {
  const [othersID, setOthersID] = useState("");
  const [showDetail, setShowDetail] = useState({
    id: 0,
    content: "",
    show: false,
  });

  const getDetail = (e) => {
    if (showDetail.id !== e.id) {
      setShowDetail({
        id: e.id,
        content: e,
        show: true,
      });
    } else {
      setShowDetail({ id: 0, content: "", show: false });
    }
  };

  const getOthersID = (e) => {
    setOthersID(e);
  };

  const list = api.map((item) => {
    return (
      <Fragment>
        <MovieList
          link={item.link}
          category={item.category}
          click={getDetail}
          clickOtherMovie={getOthersID}
        />
        <ErrorBoundary>
          {othersID === item.category && showDetail.show && (
            <MovieDetail detail={showDetail.content} />
          )}
        </ErrorBoundary>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <div className={classes.body}>
        <NavBar />
        <Banner />
        {list}
      </div>
    </Fragment>
  );
}

export default Browse;
