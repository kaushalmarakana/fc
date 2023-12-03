import {GenresStateType} from '../reducers/genresReducer';
import {MoviesStateType} from '../reducers/moviesReducer';
import {SearchStateType} from '../reducers/searchReducer';
import {RootState} from '../store';

export const selectMovies = (state: RootState): MoviesStateType => state.movies;

export const selectGenres = (state: RootState): GenresStateType => state.genres;

export const selectSearchedMovies = (state: RootState): SearchStateType =>
  state.search;
