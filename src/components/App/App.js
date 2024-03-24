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

  const fetchNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US"
    );
    const data = await response.json();
    return data.results;
  };

  const fetchUpcomingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US"
    );
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    if (showNowPlaying) {
      fetchNowPlayingMovies().then((movies) => {
        setNowPlayingMovies(movies);
      });
    } else {
      fetchUpcomingMovies().then((movies) => {
        setUpcomingMovies(movies);
      });
    }
  }, [showNowPlaying]);

  const handleToggleClick = () => {
    setShowNowPlaying(!showNowPlaying);
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
      <PrevPage />
      <NextPage />
    </div>
  );
}

export default App;