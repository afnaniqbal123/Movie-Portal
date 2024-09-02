import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieTrailer,
  fetchMovieRecommendations,
} from '../api/movieApi';
import {
  setMovieDetails,
  setMovieCredits,
  setMovieReviews,
  setMovieTrailer,
  setMovieRecommendations,
} from '../reducers/movieReducer';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { FaStar, FaHeart, FaBookmark, FaPlay } from 'react-icons/fa';
import Slider from 'react-slick';

// Styled components
const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #121212;
  color: #e0e0e0;
  min-height: 100vh;
  padding-top: 80px;
  margin-top: 100px;
  margin-left: 250px;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 100px;
  }

  .slick-slide {
    display: flex;
    justify-content: center;  // Center slides horizontally
  }
`;


const Info = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-family: 'Pacifico', cursive;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 69, 0, 0);
  border-radius: 12px;
  display: inline-block;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
  }

  &::before {
    background: url('https://img.icons8.com/?size=100&id=NZsXeTxPLdZH&format=png&color=000000') no-repeat center;
    background-size: contain;
    left: -60px;
  }

  &::after {
    background: url('https://img.icons8.com/?size=100&id=4F0PHtkpqLyC&format=png&color=000000') no-repeat center;
    background-size: contain;
    right: -60px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 15px;
    &::before, &::after {
      width: 40px;
      height: 40px;
      left: -50px;
      right: -50px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 10px;
    &::before, &::after {
      width: 30px;
      height: 30px;
      left: -40px;
      right: -40px;
    }
  }
`;

const Overview = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin: 30px auto 10px;
  font-size: 1.5rem;
  color: #ff6f61;
  font-family: 'Pacifico', cursive;
  border-bottom: 2px solid #ff6f61;
  padding-bottom: 10px;
  text-align: center;
`;

const Genres = styled.div`
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Genre = styled.span`
  background-color: #333;
  border-radius: 5px;
  padding: 5px 10px;
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px auto;
  justify-content: center;
`;

const CastItem = styled.div`
  width: 120px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CastName = styled.p`
  margin-top: 5px;
  font-size: 0.9rem;
`;

const ReviewSection = styled.div`
  margin: 20px auto;
  max-width: 800px;
`;

const Review = styled.div`
  background-color: #1e1e1e;
  padding: 15px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ReviewAuthor = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const ReviewContent = styled.p`
  font-size: 0.9rem;
`;

const UserScore = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;

const ScoreIcon = styled.div`
  color: #ff6f61;
  font-size: 1.5rem;
`;

const TrailerContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
`;

const Recommendations = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px auto;
  justify-content: center;
`;

const RecommendationItem = styled.div`
  width: 150px;
  text-align: center;
`;

const RecommendationImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const RecommendationTitle = styled.p`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #fff;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6f61;
  }
`;

const Director = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  text-align: center;
`;

const CrewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px auto;
  justify-content: center;
`;

const CrewItem = styled.div`
  width: 150px;
  text-align: center;
`;

const CrewName = styled.p`
  font-size: 0.9rem;
  margin-top: 5px;
  color: #e0e0e0;
`;

const PosterImage = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;  // Ensure the image covers the specified area without distortion
  border-radius: 8px;
`;

// Slider settings
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  centerMode: true,  // Centers the active slide
  centerPadding: '0px',  // No extra padding around the center slide
};


const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    movieDetails,
    movieCredits,
    movieReviews,
    movieTrailer,
    movieRecommendations,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        dispatch(setMovieDetails(details));

        const credits = await fetchMovieCredits(id);
        dispatch(setMovieCredits(credits));

        const reviews = await fetchMovieReviews(id);
        dispatch(setMovieReviews(reviews));

        const trailer = await fetchMovieTrailer(id);
        dispatch(setMovieTrailer(trailer));

        const recommendations = await fetchMovieRecommendations(id);
        dispatch(setMovieRecommendations(recommendations));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    getMovieDetails();
  }, [dispatch, id]);

  return (
    <DetailsContainer>
      {movieDetails && (
        <>
          <Slider {...sliderSettings}>
            <div>
              <PosterImage
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            </div>
            <div>
              <PosterImage
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
              />
            </div>
          </Slider>

          <Info>
            <Title>{movieDetails.title}</Title>
            <UserScore>
              <ScoreIcon>
                <FaStar />
              </ScoreIcon>
              {movieDetails.vote_average}%
            </UserScore>
            <IconsContainer>
              <Icon><FaHeart /></Icon>
              <Icon><FaBookmark /></Icon>
              <Icon><FaPlay /></Icon>
            </IconsContainer>
            <Overview>{movieDetails.overview}</Overview>
            <Genres>
              {movieDetails.genres.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
          </Info>

          <SectionTitle>Director & Crew</SectionTitle>
          <CrewList>
            {movieCredits.crew.slice(0, 3).map((crew) => (
              <CrewItem key={crew.credit_id}>
                <CrewName>{crew.name}</CrewName>
                <Director>{crew.job}</Director>
              </CrewItem>
            ))}
          </CrewList>

          <SectionTitle>Cast</SectionTitle>
          <CastList>
            {movieCredits.cast.slice(0, 6).map((cast) => (
              <CastItem key={cast.cast_id}>
                <CastImage
                  src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  alt={cast.name}
                />
                <CastName>{cast.name}</CastName>
              </CastItem>
            ))}
          </CastList>

          <SectionTitle>Reviews</SectionTitle>
          <ReviewSection>
            {movieReviews.results.slice(0, 3).map((review) => (
              <Review key={review.id}>
                <ReviewAuthor>{review.author}</ReviewAuthor>
                <ReviewContent>{review.content}</ReviewContent>
              </Review>
            ))}
          </ReviewSection>

          <SectionTitle>Trailer</SectionTitle>
          <TrailerContainer>
            {movieTrailer && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movieTrailer.key}`}
                controls
              />
            )}
          </TrailerContainer>

          <SectionTitle>Recommendations</SectionTitle>
          <Recommendations>
            {movieRecommendations.results.slice(0, 6).map((movie) => (
              <RecommendationItem key={movie.id}>
                <RecommendationImage
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <RecommendationTitle>{movie.title}</RecommendationTitle>
              </RecommendationItem>
            ))}
          </Recommendations>
        </>
      )}
    </DetailsContainer>
  );
};

export default MovieDetails;
