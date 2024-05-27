import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const HomePage = lazy(() => import('/src/pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('/src/pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('/src/pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('/src/pages/NotFoundPage/NotFoundPage.jsx'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

const App = () => (
  <Router>
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
