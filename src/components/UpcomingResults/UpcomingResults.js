import React from "react";
import './UpcomingResults.css';


function UpcomingResults({ upcomingMovies}) {


if (!upcomingMovies || upcomingMovies.length === 0) {
    return; // Render a message if no data is available
  }

    return (
    
        <div className="UpcomingResults"> 
        <h1 className="label">Movies Coming Soon</h1>
       {upcomingMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <p>{movie.title}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))};
    </div> 

  );
}

export default UpcomingResults;