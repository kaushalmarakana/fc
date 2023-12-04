import _ from 'lodash';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../apis/movies';
import RetryToast from '../../components/RetryToast';
import {moviesListReset} from '../../redux/actions/moviesActions';
import {selectGenres, selectMovies} from '../../redux/selectors';
import {SectionType} from '../../types';
import GenresTabNav from './GenresTabNav';
import ListLoaderView from './ListLoaderView';
import Section from './Section';

const YEAR = 2012;

const MoviesPage: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const {moviesSections, isLoading, direction, error} =
    useSelector(selectMovies);
  const {selectedGenres} = useSelector(selectGenres);
  const viewableYear = useRef<number>(YEAR);
  const lastFetchedYear = useRef(YEAR);
  const firstFetchedYear = useRef(YEAR);

  const initiateFetch = useCallback(() => {
    firstFetchedYear.current = viewableYear.current;
    lastFetchedYear.current = viewableYear.current;
    fetchMovies(dispatch, viewableYear.current, null, selectedGenres);
  }, [dispatch, selectedGenres]);

  useEffect(() => {
    initiateFetch();
  }, [initiateFetch]);

  const fetchNextYearsMovies = useCallback(() => {
    if (isLoading || !moviesSections.length) {
      return;
    }
    fetchMovies(
      dispatch,
      lastFetchedYear.current + 1,
      'down',
      selectedGenres,
      () => {
        lastFetchedYear.current = lastFetchedYear.current + 1;
      },
    );
  }, [dispatch, isLoading, moviesSections.length, selectedGenres]);

  const fetchPrevYearsMovies = useCallback(() => {
    if (isLoading || !moviesSections.length) {
      return;
    }
    fetchMovies(
      dispatch,
      firstFetchedYear.current - 1,
      'up',
      selectedGenres,
      () => {
        firstFetchedYear.current = firstFetchedYear.current - 1;
      },
    );
  }, [dispatch, isLoading, moviesSections.length, selectedGenres]);

  const tryAgain = useCallback(() => {
    if (direction === 'down') {
      fetchNextYearsMovies();
    } else if (direction === 'up') {
      fetchPrevYearsMovies();
    } else {
      initiateFetch();
    }
  }, [direction, fetchNextYearsMovies, fetchPrevYearsMovies, initiateFetch]);

  useEffect(() => {
    return () => {
      dispatch(moviesListReset());
    };
  }, [dispatch]);

  const renderSection: ListRenderItem<SectionType> = useCallback(
    ({item}) => <Section item={item} />,
    [],
  );

  const onViewCallBack = useCallback(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      viewableYear.current = Number(info.viewableItems?.[0]?.key) || YEAR;
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <GenresTabNav />
      </View>
      <View style={styles.listWrapper}>
        <ListLoaderView showLoader={isLoading && direction === 'up'} />
        <FlatList
          style={styles.listStyle}
          contentContainerStyle={styles.listContentStyle}
          data={moviesSections}
          keyExtractor={item => item.title.toString()}
          renderItem={renderSection}
          showsVerticalScrollIndicator={false}
          onEndReached={_.debounce(fetchNextYearsMovies, 300)}
          onEndReachedThreshold={1}
          onStartReached={_.debounce(fetchPrevYearsMovies, 300)}
          onStartReachedThreshold={1}
          onViewableItemsChanged={onViewCallBack}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
        <ListLoaderView showLoader={isLoading && direction === 'down'} />
        {error && <RetryToast message={error} onAction={tryAgain} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
  listContentStyle: {
    marginHorizontal: 10,
    paddingBottom: 50,
  },

  tabWrapper: {height: 60},
  listWrapper: {flex: 1},
  listStyle: {flex: 1},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default MoviesPage;
