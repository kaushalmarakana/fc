import {MoviesListType} from '../../types';
import {
  MOVIES_LIST_FETCH_ERROR,
  MOVIES_LIST_FETCH_INIT,
  MOVIES_LIST_FETCH_SUCCESS,
  MOVIES_LIST_RESET,
} from './types';

export const moviesListInit = (isPrev: boolean) => {
  return {
    type: MOVIES_LIST_FETCH_INIT,
    payload: {isPrev},
  };
};

export const moviesListSuccess = (
  movies: MoviesListType,
  year: number,
  isPrev: boolean,
) => {
  return {
    type: MOVIES_LIST_FETCH_SUCCESS,
    payload: {movies, year, isPrev},
  };
};

export const moviesListError = (msg: string) => {
  return {
    type: MOVIES_LIST_FETCH_ERROR,
    payload: msg,
  };
};

export const moviesListReset = () => {
  return {
    type: MOVIES_LIST_RESET,
  };
};
