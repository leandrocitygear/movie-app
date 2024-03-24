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
  const [searchCurrentPage, setSearchCurrentPage] = useState(1); // State for search results page

  // Function to fetch now playing movies
  const fetchNowPlayingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
  };

  // Function to fetch upcoming movies
  const fetchUpcomingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Construct the API URL with the search term
    const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=29a5360b3d6d05d01218ccd685d1210f&query=${term}&include_adult=false&language=en-US&page=1`;

    console.log("API URL:", apiSearch); // Log the constructed API URL

    fetch(apiSearch)
      .then(response => response.json())
      .then(json => {
        console.log("API Response:", json); // Log the API response
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
  };

  const handlePrevSearchPageClick = () => {
    setSearchCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
    // Handle search results pagination
    // This effect should execute whenever searchCurrentPage changes
    const handleSearchPagination = () => {
      // Perform search API call for the new page
      const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=29a5360b3d6d05d01218ccd685d1210f&query=${term}&include_adult=false&language=en-US&page=${searchCurrentPage}`;

      fetch(apiSearch)
        .then(response => response.json())
        .then(json => {
          setSearchResults(json.results);
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
        });
    };

    handleSearchPagination(); // Call the pagination function
  }, [searchCurrentPage, term]); // Depend on searchCurrentPage and term

  const handleToggleClick = () => {
    setShowNowPlaying(!showNowPlaying);
    setCurrentPage(1);
  };

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
        <SearchResults searchResults={searchResults} />
      ) : (
        <>
          {showNowPlaying ? (
            <>
              <NowPlayingResults nowPlayingMovies={nowPlayingMovies} />
              <button className="ComingButton" onClick={handleToggleClick}>
                Coming Soon
              </button>
            </>
          ) : (
            <>
              <UpcomingResults upcomingMovies={upcomingMovies} />
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
      {searchResults.length > 0 && ( // Render search pagination buttons only when there are search results
        <>
          <button className="Sprev" onClick={handlePrevSearchPageClick}>Previous</button>
          <button className="Snext" onClick={handleNextSearchPageClick}>Next</button>
        </>
      )}
    </div>
  );
}

export default App;