import React, { useState, useEffect } from "react";

import { APIKey } from "./apis/MovieApiKey";

export const useFetch = (name, type) => {
	const [movies, setMovies] = useState([]);

	function fetchNow() {
		fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${name}&type=${type}`)
			.then(res => res.json())
			.then(body => setMovies(body.Search))
	}

	useEffect(() => {
		fetchNow();
	}, [type, name])

	return { movies };
}
