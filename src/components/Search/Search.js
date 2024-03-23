import React, {useState} from "react";
import './Search.css';

function Search() {

    const [term, setTerm] = useState([]);

    return (
        <div className="searchBar">
            <form>
                <input placeholder="Whats Next" />
                <button className="Search">Search</button>
            </form>
        </div>
    )
}

export default Search;