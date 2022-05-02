import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { APIKey } from './MovieApiKey';

export const moviesAPI = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    fetchAllMovies: build.query({
      query: () => ({
        url: `?apikey=${APIKey}&s=captain_america`,
      }),
      transformResponse: (data) => {
        const transformedData = [];

        for (let i = 0; i < data.Search.length; i++) {
          let obj = {};
          for (let key in data.Search[i]) {
            obj[key[0].toLowerCase() + key.slice(1)] = data.Search[i][key];
          }
          transformedData.push(obj);
        }

        return transformedData;
      },
    }),

    fetchOneMovie: build.query({
      query: query => ({
        url: `?apikey=${APIKey}&i=${query}&plot=full`,
      }),
      transformResponse: (data) => {
        const transformedData = {};

        for (let key in data) {
          transformedData[key.toLowerCase()] = data[key];
        }

        return transformedData;
      },
    }),
  })
})

export const { useFetchAllMoviesQuery, useFetchOneMovieQuery } = moviesAPI;
