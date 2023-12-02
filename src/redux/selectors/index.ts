import {GenresStateType} from '../reducers/genresReducer';
import {MoviesStateType} from '../reducers/moviesReducer';
import {RootState} from '../store';

export const selectMovies = (state: RootState): MoviesStateType => state.movies;

export const selectGenres = (state: RootState): GenresStateType => state.genres;
