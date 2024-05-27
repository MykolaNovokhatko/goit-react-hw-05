import { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '/src/components/MovieCast/MovieCast';
import MovieReviews from '/src/components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: 'Bearer b5ba9fd32045f40847af1db0f90b3706eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWJhOWZkMzIwNDVmNDA4NDdhZjFkYjBmOTBiMzcwNiIsInN1YiI6IjY2NTMyZTIzOWU1ZTFhMjhlNGM2MzFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vuZ6E7VvQZie1MYaKOKJwVqh9fKIhy1Wk739Fe7cyU' },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
        setError('Failed to load movie details');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
