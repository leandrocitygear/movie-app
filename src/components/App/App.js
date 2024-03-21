import React, {useState, useEffect} from 'react';
import './App.css';
import Search from '../Search/Search';

function App() {
const [search, setSearch] = useState();
  return (
    
    <div className="App">
        <h1>Next Movie</h1>
        <Search />
   </div>
    
  );
}

export default App;
