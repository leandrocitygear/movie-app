import React, {useState} from 'react';
import './Upcoming.css';
// import UpcomingResults from '../UpcomingResults/UpcomingResults';

// const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US";



function Upcoming() {

//   const [upcomingMovies, setUpcomingMovies] = useState([]);

// const fetchUpcomingMovies = async () => {
//  const response = await fetch(upcomingMoviesUrl);
// const body = await response.json();

//  return body.results;
// }


//   const handleClickComing = async () => {
//     const upcomingMoviesData = await fetchUpcomingMovies();

//     setUpcomingMovies(upcomingMoviesData);
//   }



  return (
    <div className='Upcoming'>
        <button className='ComingButton' >Coming Soon</button>
        {/* <UpcomingResults upcomingMovies={upcomingMovies}/> */}
        

    </div>
  )
}

export default Upcoming