
import React, { useState, useEffect } from 'react';
import './App.css';
import UpcomingResults from '../UpcomingResults/UpcomingResults';
import PrevPage from '../PrevPage/PrevPage';
import NextPage from '../NextPage/NextPage';
import NowPlayingResults from '../NowPlayingResults/NowPlayingResults';
import SearchResults from '../SearchResults/SearchResults';

function App() {
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1); 
  const [forceRerender, setForceRerender] = useState(false);

  
  const fetchNowPlayingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
  };

  const fetchUpcomingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query=${term}&include_adult=false&language=en-US&page=1`;

    fetch(apiSearch)
      .then(response => response.json())
      .then(json => {
        setSearchResults(json.results);
      })
      .catch(error => {
        console.error("Error fetching search results:", error);
      });
  }

  const handleChange = (e) => {
    setTerm(e.target.value)
  }

  const handleNextSearchPageClick = () => {
    setSearchCurrentPage((prevPage) => prevPage + 1);
    setForceRerender(prev => !prev);
  };

  const handlePrevSearchPageClick = () => {
    setSearchCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setForceRerender(prev => !prev);
  };

  useEffect(() => {
    if (showNowPlaying) {
      fetchNowPlayingMovies(currentPage).then((movies) => {
        setNowPlayingMovies(movies);
      });
    } else {
      fetchUpcomingMovies(currentPage).then((movies) => {
        setUpcomingMovies(movies);
      });
    }
  }, [showNowPlaying, currentPage]);

  useEffect(() => {
    
    const handleSearchPagination = () => {

      const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query=${term}&include_adult=false&language=en-US&page=${searchCurrentPage}`;

      fetch(apiSearch)
        .then(response => response.json())
        .then(json => {
          setSearchResults(json.results);
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
        });
    };

    handleSearchPagination(); 
  }, [searchCurrentPage, term]); 

  const handleToggleClick = () => {
    setShowNowPlaying(!showNowPlaying);
    setCurrentPage(1);
  };

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setForceRerender(prev => !prev);
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setForceRerender(prev => !prev);
  };

  const handleGoBack = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <h1 className="logo">Next Movie</h1>
      <div className="searchBar">
        <form onSubmit={handleSearch}>
          <input onChange={handleChange} type="text" value={term} placeholder="Whats Next" />
          <button className="Search" type="submit">Search</button>
        </form>
      </div>
      {searchResults.length > 0 ? (
        <SearchResults key={forceRerender ? 'forceRerender' : 'normal'} searchResults={searchResults} />
      ) : (
        <>
          {showNowPlaying ? (
            <>
              <NowPlayingResults key={forceRerender ? 'forceRerender' : 'normal'} nowPlayingMovies={nowPlayingMovies} />
              <h1 className="label1">Movies Now Playing</h1>
              <button className="ComingButton" onClick={handleToggleClick}>
                Coming Soon
              </button>
            </>
          ) : (
            <>
              <UpcomingResults key={forceRerender ? 'forceRerender' : 'normal'} upcomingMovies={upcomingMovies} />
              <h1 className="label2">Movies Coming Soon</h1>
              <button className="NowButton" onClick={handleToggleClick}>
                Now Playing
              </button>
            </>
          )}
          {searchResults.length === 0 && (
            <>
              <PrevPage onPrevPageClick={handlePrevPageClick} />
              <NextPage onNextPageClick={handleNextPageClick} />
            </>
          )}
        </>
      )}
      {searchResults.length > 0 && (
        <>
          <button className="Sprev" onClick={handlePrevSearchPageClick}>Previous</button>
          <button className="Snext" onClick={handleNextSearchPageClick}>Next</button>
          <button onClick={handleGoBack} className="goBackButton">Go back</button>
          <h1 className="label3">Search Results</h1>
          
        </>
      )}
    </div>
  );
}

export default App;