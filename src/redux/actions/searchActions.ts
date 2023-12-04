import {MoviesListType} from '../../types';
import {
  MOVIES_SEARCH_FETCH_ERROR,
  MOVIES_SEARCH_FETCH_INIT,
  MOVIES_SEARCH_FETCH_SUCCESS,
  MOVIES_SEARCH_LIST_RESET,
} from './types';

export const moviesSearchFetchInit = (isUpdate: boolean) => {
  return {
    type: MOVIES_SEARCH_FETCH_INIT,
    payload: {isUpdate},
  };
};

export const moviesSearchFetchSuccess = (
  movies: MoviesListType,
  totalPages: number,
) => {
  return {
    type: MOVIES_SEARCH_FETCH_SUCCESS,
    payload: {movies, totalPages},
  };
};

export const moviesSearchFetchError = (msg: string) => {
  return {
    type: MOVIES_SEARCH_FETCH_ERROR,
    payload: msg,
  };
};

export const moviesSearchListReset = () => {
  return {
    type: MOVIES_SEARCH_LIST_RESET,
  };
};
