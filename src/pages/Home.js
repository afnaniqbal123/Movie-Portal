import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../api/movieApi';
import { setMovieList } from '../reducers/movieReducer';
import MovieList from '../components/MovieList';
import styled from 'styled-components';



const HomeContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  min-height: 100vh;
  padding-top: 80px; /* Adjust if Navbar height changes */
  margin-left: 250px; /* Sidebar width */
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 100px; /* Ensure padding for Navbar */
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-family: 'Pacifico', cursive; /* Fun font style */
  text-align: center;
  margin: 0;
  padding: 20px;
  background: rgba(255, 69, 0, 0); /* Light red background */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: inline-block;
  position: relative;
   margin-left: 450px;
  

  /* Decorative lines */
  &::before, &::after {
    content: url('https://img.icons8.com/ios-filled/50/ff4500/star.png'); /* Star icon */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
  }

  &::before {
    margin-left: -100px; /* Adjust the spacing from the left */
  }

  &::after {
    margin-left: 50px; /* Adjust the spacing from the right */
  }
`;


const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movieList);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchPopularMovies();
        dispatch(setMovieList(movies));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    getMovies();
  }, [dispatch]);

  return (
    <HomeContainer>
      <Title>Popular Movies</Title>
      <MovieList movies={movies} />
    </HomeContainer>
  );
};

export default Home;
