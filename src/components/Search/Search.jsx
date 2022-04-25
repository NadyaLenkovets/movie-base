import React, { useState } from "react";
import { Link } from 'react-router-dom';

import "./Search.css";

export const Search = () => {
	const [query, setQuery] = useState('');

	const handleChange = (e) => {
		setQuery(e.target.value);
	}

	return <div className="search">
		<input
			className="searchInput"
			type="text"
			placeholder="Type your movie title"
			onChange={handleChange}
		/>
		<Link to={`/search/${query}`}>
			<button className="search__btn" >Search</button>
		</Link>
	</div>
}

