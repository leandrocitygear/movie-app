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

  if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
    return;
  }

  return (
    <div className="NowPlayingResults">
      <h1 className="label">Movies Now Playing</h1>
      {nowPlayingMovies.map((movie) => (
        <div className="card" key={movie.id} onClick={() => handleCardClick(movie.id)}>
          <img className="posters" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.title}</p>
        </div>
      ))}
      {selectedMovie && (
        <div className="trailer-container">
          <iframe
  className="trailer"
  width="560"
  height="315"
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
