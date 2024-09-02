import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../api/movieApi';
import { setMovieList } from '../reducers/movieReducer';
import MovieList from '../components/MovieList';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 100vh;
  padding-top: 80px; /* Adjust if Navbar height changes */
  margin-left: 250px; /* Sidebar width */
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 100px; /* Ensure padding for Navbar */
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ff6f61;
  border-radius: 5px;
  background: #1e1e1e;
  color: #fff;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff6f61;
    outline: none;
  }
`;

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movieList);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchMovies(query);
      dispatch(setMovieList(results));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchBar
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <MovieList movies={movies} />
    </SearchContainer>
  );
};

export default SearchResults;
