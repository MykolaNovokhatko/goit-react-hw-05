import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '/src/components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { query, include_adult: false, language: 'en-US', page: 1 },
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWJhOWZkMzIwNDVmNDA4NDdhZjFkYjBmOTBiMzcwNiIsInN1YiI6IjY2NTMyZTIzOWU1ZTFhMjhlNGM2MzFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vuZ6E7VvQZie1MYaKOKJwVqh9fKIhy1Wk739Fe7cyU',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error searching movies', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.query.value.trim();
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Movies</h1>
      <form className={css.formStyle} onSubmit={handleSearch}>
        <input
          className={css.inputStyle}
          type="text"
          name="query"
          defaultValue={query}
        />
        <button className={css.btnSearch} type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
