import React from "react";
import './Search.css';

function Search() {
    return (
        <div className="searchBar">
            <form>
                <input placeholder="What do you wanna go see next" />
                <button>Search</button>
            </form>
        </div>
    )
}

export default Search;