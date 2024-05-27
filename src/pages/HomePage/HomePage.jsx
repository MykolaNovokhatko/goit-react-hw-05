import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '/src/components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: 'Bearer b5ba9fd32045f40847af1db0f90b3706eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWJhOWZkMzIwNDVmNDA4NDdhZjFkYjBmOTBiMzcwNiIsInN1YiI6IjY2NTMyZTIzOWU1ZTFhMjhlNGM2MzFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1vuZ6E7VvQZie1MYaKOKJwVqh9fKIhy1Wk739Fe7cyU',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
