import React from "react";
import './Search.css';

function Search() {
    return (
        <div className="searchBar">
            <form>
                <input placeholder="Whats Next" />
                <button>Search</button>
            </form>
        </div>
    )
}

export default Search;