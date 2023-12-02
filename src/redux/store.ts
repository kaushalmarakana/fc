import {combineReducers, legacy_createStore as createStore} from 'redux';

import movies from './reducers/moviesReducer';
import genres from './reducers/genresReducer';

export const reducers = combineReducers({
  movies,
  genres,
});

export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
