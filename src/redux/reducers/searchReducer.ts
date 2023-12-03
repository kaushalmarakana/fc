import {AnyAction} from 'redux';
import {MoviesListType, Nullable} from '../../types';
import {
  MOVIES_SEARCH_FETCH_ERROR,
  MOVIES_SEARCH_FETCH_INIT,
  MOVIES_SEARCH_FETCH_SUCCESS,
} from '../actions/types';

export type SearchStateType = {
  movies: MoviesListType;
  isLoading: Nullable<boolean>;
  error: Nullable<string>;
};

const initialState: SearchStateType = {
  movies: [],
  isLoading: false,
  error: null,
};

const searchReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case MOVIES_SEARCH_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
        movies: action.payload.isUpdate ? state.movies : [],
      };
    case MOVIES_SEARCH_FETCH_SUCCESS:
      const {movies, isUpdate} = action.payload;
      return {
        ...state,
        movies: isUpdate ? state.movies?.concat(movies) : movies,
        isLoading: false,
        error: null,
      };
    case MOVIES_SEARCH_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default searchReducer;
