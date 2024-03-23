import React, {useEffect, useState} from 'react'
import './Upcoming.css';
import MovieCard from '../MovieCard/MovieCard';

const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US";

const getMovies = async () => {
 const response = await fetch(upcomingMoviesUrl);
const body = await response.json();

 return body.results;
}

function Upcoming() {

  const [upcomingMovies, setUpcomingMovies] = useState([]);


// useEffect(() => {
//  fetch(upcomingMoviesUrl)
//  .then(response => response.json())
//  .then(json => setMovies(json.results))
// }, []);

// console.log(movies);

  const handleClick = async () => {
    const upcomingMoviesUrl = await getMovies();

    setUpcomingMovies(upcomingMoviesUrl);
  }



  return (
    <div className='Upcoming'>
        <button className='ComingButton' onClick={handleClick} >Coming Soon</button>
        <MovieCard display={upcomingMovies}/>
        

    </div>
  )
}

export default Upcoming