import React, {useState, useEffect} from 'react';
import './App.css';
import Search from '../Search/Search';
import UpcomingResults from '../UpcomingResults/UpcomingResults';
import PrevPage from '../PrevPage/PrevPage';
import NextPage from '../NextPage/NextPage';
import NowPlaying from '../NowPlaying/NowPlaying';
import Upcoming from '../Upcoming/Upcoming';
import NowPlayingResults from '../NowPlayingResults/NowPlayingResults';

function App() {
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNowPlayingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
  };

  const fetchUpcomingMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=${page}&region=US`
    );
    const data = await response.json();
    return data.results;
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
      <Search />
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
      <PrevPage onPrevPageClick={handlePrevPageClick}/>
      <NextPage onNextPageClick={handleNextPageClick} />
      {showNowPlaying ? <NowPlaying /> : <Upcoming />}
    </div>
  );
}

export default App;