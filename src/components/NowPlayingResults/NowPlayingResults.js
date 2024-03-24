import React from "react";
import './NowPlayingResults.css';



function NowPlayingResults({ nowPlayingMovies }) {


      if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
    return; // Render a message if no data is available
  }

    return (

<div className="NowPlayingResults">
  <h1 className="label">Movies Now Playing</h1>
      {nowPlayingMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <p>{movie.title}</p>
            
            
          </div>
        ))}
</div>
    
  );
}

export default NowPlayingResults;