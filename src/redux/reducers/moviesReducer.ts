import {AnyAction} from 'redux';
import {DirectionType, MoviesSectionType, Nullable} from '../../types';
import {
  MOVIES_LIST_FETCH_ERROR,
  MOVIES_LIST_FETCH_INIT,
  MOVIES_LIST_FETCH_SUCCESS,
  MOVIES_LIST_RESET,
} from '../actions/types';

export type MoviesStateType = {
  moviesSections: MoviesSectionType;
  isLoading: Nullable<boolean>;
  error: Nullable<string>;
  direction: Nullable<DirectionType>;
};

const initialState: MoviesStateType = {
  moviesSections: [],
  isLoading: false,
  error: null,
  direction: null,
};

const moviesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case MOVIES_LIST_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
        direction: action.payload.direction,
      };
    case MOVIES_LIST_FETCH_SUCCESS:
      const {year, movies, direction} = action.payload;
      const entry = {
        title: year,
        data: movies,
      };
      let results = [];
      if (direction === 'up') {
        results = [entry, ...state.moviesSections];
      } else {
        results = [...state.moviesSections, entry];
      }
      return {
        ...state,
        moviesSections: results,
        isLoading: false,
        error: null,
        direction: null,
      };
    case MOVIES_LIST_FETCH_ERROR:
      return {
        ...state,
        error: action.payload.msg,
        isLoading: false,
        direction: action.payload.direction,
      };
    case MOVIES_LIST_RESET:
      return {
        ...state,
        moviesSections: [],
      };
    default:
      return state;
  }
};
export default moviesReducer;
