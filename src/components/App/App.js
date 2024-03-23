import React, {useState, useEffect} from 'react';
import './App.css';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';
import PrevPage from '../PrevPage/PrevPage';
import NextPage from '../NextPage/NextPage';
import NowPlaying from '../NowPlaying/NowPlaying';
import Upcoming from '../Upcoming/Upcoming';

const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US";

function App() {
  // const [movies, setMovies] = useState([]);


  // useEffect(() => {
  //  fetch(upcomingMoviesUrl)
  //  .then(response => response.json())
  //  .then(json => setMovies(json.results))
  // }, []);
  
  // // console.log(movies);
  
  //   const handleClick = () => {
  //     setMovies(movies)
  //   }


  return (
    
    <div className="App">
        <h1 className="logo">Next Movie</h1>
        <Search />
        <MovieCard />
        <PrevPage />
        <NextPage />
        <NowPlaying />
        <Upcoming />
   </div>
    
  );
}

export default App;
