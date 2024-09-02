import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  h3 {
    margin: 10px;
    color: #fff;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;


const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 10px;
`;


const CardBody = styled.div`
  padding: 15px;
  color: #fff;
`;


const ReleaseDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #ff6f61;
`;

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Link to={`/movie/${movie.id}`}>
        <Poster src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <CardBody>
          <Title>{movie.title}</Title>
          <ReleaseDate>{movie.release_date}</ReleaseDate>
        </CardBody>
      </Link>
    </Card>
  );
};

export default MovieCard;
