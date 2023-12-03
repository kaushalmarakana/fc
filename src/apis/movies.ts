import {getApiErrorMessage} from '../utils/helpers';
import {Dispatch} from 'redux';
import axios from 'axios';
import {
  moviesListError,
  moviesListInit,
  moviesListSuccess,
} from '../redux/actions/moviesActions';
import {
  genresListFetchError,
  genresListFetchInit,
  genresListFetchSuccess,
} from '../redux/actions/genresActions';
import {GenresStateType} from '../redux/reducers/genresReducer';
import {DirectionType, Nullable} from '../types';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  dispatch: Dispatch,
  year: number,
  direction: Nullable<DirectionType>,
  selectedGenres: GenresStateType['selectedGenres'],
) => {
  let genresIds = '';

  if (selectedGenres) {
    genresIds = Object.keys(selectedGenres).join(',');
  }
  const endPoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genresIds}`;

  try {
    dispatch(moviesListInit(direction));
    const response = await axios.get(endPoint);
    const movies = response?.data?.results;
    dispatch(moviesListSuccess(movies, year, direction));
  } catch (err) {
    const msg = getApiErrorMessage(err);
    dispatch(moviesListError(msg));
  }
};

export const fetchGenres = async (dispatch: Dispatch) => {
  const endPoint = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

  try {
    dispatch(genresListFetchInit());
    const response = await axios.get(endPoint);
    const genres = response?.data?.genres;
    dispatch(genresListFetchSuccess(genres));
  } catch (err) {
    const msg = getApiErrorMessage(err);
    dispatch(genresListFetchError(msg));
  }
};

export const fetchSearchedMovies = async (
  dispatch: Dispatch,
  query: string,
) => {
  const endPoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    dispatch(genresListFetchInit());
    const response = await axios.get(endPoint);
    const genres = response?.data?.genres;
    dispatch(genresListFetchSuccess(genres));
  } catch (err) {
    const msg = getApiErrorMessage(err);
    dispatch(genresListFetchError(msg));
  }
};
