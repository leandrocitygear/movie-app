import React, {useState} from 'react';
import './App.css';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';


function App() {

const [term, setTerm] = useState([]);

  return (
    
    <div className="App">
        <h1 className="logo">Next Movie</h1>
        <Search />
        <MovieCard />
   </div>
    
  );
}

export default App;
