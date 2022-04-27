import React, { useState, useEffect } from "react";

import { APIKey } from "./apis/MovieApiKey";

export const useFetch = (name, type) => {
  const [status, setStatus] = useState({
    data: undefined,
    error: undefined
  });

  function fetchNow() {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${name}&type=${type}`)
      .then(res => res.json())
      .then(res => {
        setStatus({ data: res.Search })
      })
      .catch((error) => {
        setStatus({ error })
      })
  }

  useEffect(() => {
    fetchNow();
  }, [type, name])

  return { ...status };
}

