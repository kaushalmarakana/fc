import {AnyAction} from 'redux';
import {MoviesListType, Nullable} from '../../types';
import {
  MOVIES_SEARCH_FETCH_ERROR,
  MOVIES_SEARCH_FETCH_INIT,
  MOVIES_SEARCH_FETCH_SUCCESS,
  MOVIES_SEARCH_LIST_RESET,
} from '../actions/types';

export type SearchStateType = {
  movies: MoviesListType;
  isLoading: Nullable<boolean>;
  error: Nullable<string>;
  totalPages: number;
};

const initialState: SearchStateType = {
  movies: [],
  isLoading: false,
  totalPages: 1,
  error: null,
};

const searchReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case MOVIES_SEARCH_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MOVIES_SEARCH_FETCH_SUCCESS:
      const {movies, totalPages} = action.payload;
      return {
        ...state,
        movies: [...state.movies, ...movies],
        totalPages: totalPages,
        isLoading: false,
        error: null,
      };
    case MOVIES_SEARCH_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case MOVIES_SEARCH_LIST_RESET:
      return {
        ...state,
        movies: [],
      };

    default:
      return state;
  }
};
export default searchReducer;
