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




// const arr = [
//   {
//     Name: 'Nadya',
//     Age: 30,
//   },
//   {
//     Name: 'Vasya',
//     City: 'Minsk',
//   },
//   {
//     Name: 'Lena',
//     Surname: 'OOO',
//   },
// ];

// const resArr = [];
// const newObj = {};
// for (let object of arr) {
//   for (let key1 in object) {
//     // key1 = key1.toLowerCase();
//     newObj[key1[0].toLowerCase() + key1.slice(1)] = object[key1];
//     console.log(newObj);
//     // resArr.push(newObj);
//   }

//   console.log(resArr);
// }