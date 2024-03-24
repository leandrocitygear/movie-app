import React, {useState} from 'react';
import './NowPlaying.css';
// import NowPlayingResults from '../NowPlayingResults/NowPlayingResults';

// const nowPlayingMoviesUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US&page=1&region=US";



function NowPlaying() {

//   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  

// const fetchNowPlayingMovies = async () => {
//  const response = await fetch(nowPlayingMoviesUrl);
// const body = await response.json();

//  return body.results;
// }

  

//   const handleClickNow = async () => {
//     const nowPlayingMoviesData = await fetchNowPlayingMovies();

//     setNowPlayingMovies(nowPlayingMoviesData);
//   }



  return (
    <div className='NowPlaying'>
        <button className='NowButton' >Now Playing</button>
        {/* <NowPlayingResults nowPlayingMovies={nowPlayingMovies}/> */}
        

    </div>
  )
}

export default NowPlaying