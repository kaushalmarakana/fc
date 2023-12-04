import {DirectionType, MoviesListType, Nullable} from '../../types';
import {
  MOVIES_LIST_FETCH_ERROR,
  MOVIES_LIST_FETCH_INIT,
  MOVIES_LIST_FETCH_SUCCESS,
  MOVIES_LIST_RESET,
} from './types';

export const moviesListInit = (direction: Nullable<DirectionType>) => {
  return {
    type: MOVIES_LIST_FETCH_INIT,
    payload: {direction},
  };
};

export const moviesListSuccess = (
  movies: MoviesListType,
  year: number,
  direction: Nullable<DirectionType>,
) => {
  return {
    type: MOVIES_LIST_FETCH_SUCCESS,
    payload: {movies, year, direction},
  };
};

export const moviesListError = (msg: string, direction: Nullable<string>) => {
  return {
    type: MOVIES_LIST_FETCH_ERROR,
    payload: {msg, direction},
  };
};

export const moviesListReset = () => {
  return {
    type: MOVIES_LIST_RESET,
  };
};
