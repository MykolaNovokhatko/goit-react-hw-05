import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '/src/components/Navigation/Navigation';

const HomePage = lazy(() => import('/src/pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('/src/pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('/src/pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('/src/pages/NotFoundPage/NotFoundPage.jsx'));

const App = () => (
  <Router>
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
