import {SectionListData} from 'react-native';
import {Directions} from '../utils/constants';

export type Nullable<T> = T | null | undefined;

export type MovieItemType = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  popularity: number;
  genre_ids: Array<number>;
};

export type SectionType = {
  title: number;
  data: MoviesListType;
};

export type MoviesListType = Array<MovieItemType>;

export type MoviesSectionType = ReadonlyArray<
  SectionListData<MovieItemType, SectionType>
>;

export type DirectionType = keyof typeof Directions;

export type GenreType = {
  id: number;
  name: string;
};

export type GenresListType = Nullable<Array<GenreType>>;
