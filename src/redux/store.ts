import {combineReducers, legacy_createStore as createStore} from 'redux';

import movies from './reducers/moviesReducer';
import genres from './reducers/genresReducer';
import search from './reducers/searchReducer';

export const reducers = combineReducers({
  movies,
  genres,
  search,
});

export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
