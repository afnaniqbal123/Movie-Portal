import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieList: [],
  movieDetails: null,
  movieCredits: { cast: [], crew: [] },
  movieReviews: { results: [] },
  movieTrailer: null,
  movieRecommendations: { results: [] },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      state.movieList = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setMovieCredits: (state, action) => {
      state.movieCredits = action.payload;
    },
    setMovieReviews: (state, action) => {
      state.movieReviews = action.payload;
    },
    setMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    setMovieRecommendations: (state, action) => {
      state.movieRecommendations = action.payload;
    },
  },
});

export const {
  setMovieList,
  setMovieDetails,
  setMovieCredits,
  setMovieReviews,
  setMovieTrailer,
  setMovieRecommendations,
} = movieSlice.actions;

export default movieSlice.reducer;
