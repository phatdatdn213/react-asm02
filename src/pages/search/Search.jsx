import { useState, Fragment } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";
import ResultList from "../../components/ResultList/ResultList";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./Search.module.css";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const Search = () => {
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState({ id: 0, content: "", show: false });

  const responseHandle = (e) => {
    if (e.id !== response.id) {
      setResponse({
        id: e.id,
        content: e,
        show: true,
      });
    } else {
      setResponse({ id: 0, content: "", show: false });
    }
  };

  const requestHandle = (e) => {
    setRequest(e);
  };

  return (
    <Fragment>
      <div className={classes.body}>
        <NavBar />
        <SearchForm getValue={requestHandle} />
        <h2 className={classes.title}>Search Result</h2>
        {response.show && <MovieDetail detail={response.content} />} 
        <ErrorBoundary>
          <ResultList passValue={request} getDetail={responseHandle} />
        </ErrorBoundary>
      </div>
    </Fragment>
  );
};

export default Search;
