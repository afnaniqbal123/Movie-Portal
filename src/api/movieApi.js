import axios from "axios";
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  console.log(response.data);
  return response.data;

};

export const fetchMovieCredits = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  return data.results;
};

export const fetchMovieTrailer = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const trailers = response.data.results.filter((video) => video.type === 'Trailer');
  return trailers.length > 0 ? trailers[0] : null;
};

export const fetchMovieRecommendations = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
  return response.data;
};