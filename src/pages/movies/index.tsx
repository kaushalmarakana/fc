import _ from 'lodash';
import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../apis/movies';
import {selectGenres, selectMovies} from '../../redux/selectors';
import {SectionType} from '../../types';
import ErrorBackfill from './ErrorBackfill';
import GenresTabNav from './GenresTabNav';
import ListLoaderView from './ListLoaderView';
import Section from './Section';
import {moviesListReset} from '../../redux/actions/moviesActions';

const YEAR = 2012;

const MoviesPage: React.FC<{}> = () => {
  const {moviesSections, isLoading, direction, error} =
    useSelector(selectMovies);
  const {selectedGenres} = useSelector(selectGenres);

  const dispatch = useDispatch();
  const lastFetchedYear = useRef(YEAR);
  const firstFetchedYear = useRef(YEAR);
  const flatListRef = useRef<any>();
  const initialPaintFailed = !moviesSections.length && !!error;

  const initiateFetch = useCallback(() => {
    firstFetchedYear.current = YEAR;
    lastFetchedYear.current = YEAR;
    fetchMovies(dispatch, YEAR, null, selectedGenres);
  }, [dispatch, selectedGenres]);

  useEffect(() => {
    initiateFetch();
  }, [initiateFetch]);

  const tryAgain = () => {
    initiateFetch();
  };

  useEffect(() => {
    return () => {
      dispatch(moviesListReset());
    };
  }, [dispatch]);

  const fetchNextYearsMovies = () => {
    if (isLoading || initialPaintFailed) {
      return;
    }
    fetchMovies(dispatch, lastFetchedYear.current + 1, 'down', selectedGenres);
    lastFetchedYear.current = lastFetchedYear.current + 1;
  };

  const fetchPrevYearsMovies = () => {
    if (isLoading || initialPaintFailed) {
      return;
    }
    fetchMovies(dispatch, firstFetchedYear.current - 1, 'up', selectedGenres);
    firstFetchedYear.current = firstFetchedYear.current - 1;
  };

  const renderListHeader = () => {
    return <ListLoaderView show={isLoading && direction === 'up'} />;
  };

  const renderListFooter = () => {
    return <ListLoaderView show={isLoading && direction === 'down'} />;
  };

  const renderSection: ListRenderItem<SectionType> = ({item}) => (
    <Section item={item} />
  );

  const renderBackfill = () => (
    <ErrorBackfill
      initialPaintFailed={initialPaintFailed}
      error={error}
      onRetry={tryAgain}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <GenresTabNav />
      </View>
      <View style={styles.listWrapper}>
        {renderListHeader()}
        <FlatList
          ref={ref => (flatListRef.current = ref)}
          style={styles.listStyle}
          contentContainerStyle={styles.listContentStyle}
          data={moviesSections}
          keyExtractor={item => item.title.toString()}
          renderItem={renderSection}
          showsVerticalScrollIndicator={false}
          onEndReached={_.debounce(fetchNextYearsMovies, 500)}
          onEndReachedThreshold={1}
          onStartReached={_.debounce(fetchPrevYearsMovies, 500)}
          onStartReachedThreshold={1}
          ListEmptyComponent={renderBackfill}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
        {renderListFooter()}
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
