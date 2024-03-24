import React from 'react'
import './SearchResults.css'

const SearchResults = ({searchResults}) => {
    console.log("Received Search Results:", searchResults);

    const handleGoBack = () => {
      window.location.reload(); // Reload the page
    };

    if (!searchResults || searchResults.length === 0) {
        return  (
            <div className='SearchResults'>
                <h1 className="label">Search Results</h1>
                <p>No results found.</p>
            </div>
        );
      }

  return (
    <div className='SearchResults'>
        <h1 className="label">Search Results</h1>
        <button onClick={handleGoBack} className="goBackButton">Go back</button>
       {searchResults.map((movie) => (
          <div className="card" key={movie.id}>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <p>{movie.title}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))};
    </div> 
  )
}

export default SearchResults