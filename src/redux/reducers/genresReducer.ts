import {AnyAction} from 'redux';
import {GenreType, GenresListType, Nullable} from '../../types';
import {
  GENRES_LIST_FETCH_ERROR,
  GENRES_LIST_FETCH_INIT,
  GENRES_LIST_FETCH_SUCCESS,
  GENRES_SELECTION_UPDATE,
} from '../actions/types';

export type GenresStateType = {
  genres: GenresListType;
  isLoading: Nullable<boolean>;
  error: Nullable<string>;
  selectedGenres: Nullable<Record<number, GenreType>>;
};

const initialState: GenresStateType = {
  genres: [],
  isLoading: false,
  error: null,
  selectedGenres: null,
};

const genresReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GENRES_LIST_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GENRES_LIST_FETCH_SUCCESS:
      const {genres} = action.payload;

      return {
        ...state,
        genres: genres,
        isLoading: false,
        error: null,
      };
    case GENRES_LIST_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case GENRES_SELECTION_UPDATE:
      const cloneSelected = {...state.selectedGenres};
      if (cloneSelected[action.payload.genre.id]) {
        delete cloneSelected[action.payload.genre.id];
      } else {
        cloneSelected[action.payload.genre.id] = action.payload.genre;
      }
      return {
        ...state,
        selectedGenres: cloneSelected,
      };
    default:
      return state;
  }
};
export default genresReducer;
