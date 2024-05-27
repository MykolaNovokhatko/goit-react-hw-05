import React, { useState, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: 'b5ba9fd32045f40847af1db0f90b3706' },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/movies');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <Link to={`${url}/cast`}>Cast</Link>
      <Link to={`${url}/reviews`}>Reviews</Link>
      <Route path={`${path}/cast`} component={MovieCast} />
      <Route path={`${path}/reviews`} component={MovieReviews} />
    </div>
  );
};

export default MovieDetailsPage;
