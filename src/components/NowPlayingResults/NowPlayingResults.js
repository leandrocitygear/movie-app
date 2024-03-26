import React, { useState } from "react";
import './NowPlayingResults.css';

function NowPlayingResults({ nowPlayingMovies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=29a5360b3d6d05d01218ccd685d1210f&language=en-US`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const trailerKey = data.results[0].key;
      setSelectedMovie(trailerKey);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleCloseButtonClick = () => {
    setSelectedMovie(null);
  };

  if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
    return null; // Return null when there are no movies to render
  }

  return (
    <div className="NowPlayingResults">
      {nowPlayingMovies.map((movie) => (
        <div className="card" key={movie.id} onClick={() => handleCardClick(movie.id)}>
          <img className="posters" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg' } alt={movie.title} />
          <p>{movie.title}</p>
          <p>Ratings: {movie.vote_average}</p>
        </div>
      ))}
      {selectedMovie && (
        <div className="trailer-container">
          <span className="closeButton" onClick={handleCloseButtonClick}>x</span>
          <iframe
            className="trailer"
            width="75%"
            height="85%"
            src={`https://www.youtube.com/embed/${selectedMovie}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default NowPlayingResults;
