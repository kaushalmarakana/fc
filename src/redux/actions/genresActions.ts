import {GenreType, GenresListType} from '../../types';
import {
  GENRES_LIST_FETCH_ERROR,
  GENRES_LIST_FETCH_INIT,
  GENRES_LIST_FETCH_SUCCESS,
  GENRES_SELECTION_UPDATE,
} from './types';

export const genresListFetchInit = () => {
  return {
    type: GENRES_LIST_FETCH_INIT,
  };
};

export const genresListFetchSuccess = (genres: GenresListType) => {
  return {
    type: GENRES_LIST_FETCH_SUCCESS,
    payload: {genres},
  };
};

export const genresListFetchError = (msg: string) => {
  return {
    type: GENRES_LIST_FETCH_ERROR,
    payload: msg,
  };
};

export const genresSelectionUpdate = (genre: GenreType) => {
  return {
    type: GENRES_SELECTION_UPDATE,
    payload: {genre},
  };
};
