import { useState } from 'react';
import axios from 'axios';
import MovieList from '/src/components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { query, include_adult: false, language: 'en-US', page: 1 },
        headers: { Authorization: 'Bearer b5ba9fd32045f40847af1db0f90b3706eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWJhOWZkMzIwNDVmNDA4NDdhZjFkYjBmOTBiMzcwNiIsInN1YiI6IjY2NTMyZTIzOWU1ZTFhMjhlNGM2MzFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vuZ6E7VvQZie1MYaKOKJwVqh9fKIhy1Wk739Fe7cyU' },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies', error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
