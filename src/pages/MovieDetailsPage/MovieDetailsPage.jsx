import { useState, useEffect, useRef } from 'react';
import {
  Link,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import MovieCast from '/src/components/MovieCast/MovieCast';
import MovieReviews from '/src/components/MovieReviews/MovieReviews';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWJhOWZkMzIwNDVmNDA4NDdhZjFkYjBmOTBiMzcwNiIsInN1YiI6IjY2NTMyZTIzOWU1ZTFhMjhlNGM2MzFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vuZ6E7VvQZie1MYaKOKJwVqh9fKIhy1Wk739Fe7cyU',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
        setError('Failed to load movie details');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(prevLocationRef.current);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const countries = movie.production_countries.map(country => country.name).join(', ');

  return (
    <div className={css.container}>
      <button className={css.btnDetails} onClick={handleGoBack}>
        Go back
      </button>
      <h1 className={css.title}>{movie.title}</h1>
      <div className={css.infoMoviePosition}>
        <img
          className={css.imgDetails}
          src={imageUrl}
          alt={`${movie.title} poster`}
          width="260"
        />
        <div>
          <h2 className={css.overview}>Overview</h2>
          <p className={css.infoMovie}>{movie.overview}</p>
          <p className={css.overview}><strong>Rating:</strong> {movie.vote_average}</p>
          <p className={css.overview}><strong>Country:</strong> {countries}</p>
        </div>
      </div>
      <div className={css.infoRoutes}>
        <div className={css.btnLink}>
          <Link className={css.linkDetails} to="cast">
            Cast
          </Link>
          <Link className={css.linkDetails} to="reviews">
            Reviews
          </Link>
        </div>
        <div className={css.routesContainer}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
