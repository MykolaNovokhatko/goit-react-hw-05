import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.listMovie}>
      {movies.map(movie => (
        <li className={css.itemMovie} key={movie.id}>
          <Link
            className={css.linkMovie}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`${movie.title} poster`}
              width="160px"
            />
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
