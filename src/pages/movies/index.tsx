import _ from 'lodash';
import React, {useEffect, useRef} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGenres, fetchMovies} from '../../apis/movies';
import CircularLoader from '../../components/CircularLoader';
import {selectGenres, selectMovies} from '../../redux/selectors';
import {SectionType} from '../../types';
import ListLoaderView from './ListLoaderView';
import Section from './Section';
import GenresTabNav from './GenresTabNav';

const YEAR = 2012;

const MoviesPage: React.FC<{}> = () => {
  const {moviesSections, isLoading, direction} = useSelector(selectMovies);
  const {selectedGenres, isLoading: genresLoading} = useSelector(selectGenres);

  const dispatch = useDispatch();
  const lastFetchedYear = useRef(YEAR);
  const firstFetchedYear = useRef(YEAR);
  const flatListRef = useRef<any>();

  useEffect(() => {
    firstFetchedYear.current = YEAR;
    lastFetchedYear.current = YEAR;
    fetchMovies(dispatch, YEAR, false, selectedGenres);
  }, [dispatch, selectedGenres]);

  const fetchNextYearsMovies = () => {
    if (isLoading) {
      return;
    }
    fetchMovies(dispatch, lastFetchedYear.current + 1, false, selectedGenres);
    lastFetchedYear.current = lastFetchedYear.current + 1;
  };

  const fetchPrevYearsMovies = () => {
    if (isLoading) {
      return;
    }
    fetchMovies(dispatch, firstFetchedYear.current - 1, true, selectedGenres);
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

  return (
    <View>
      <GenresTabNav />
      <FlatList
        ref={ref => (flatListRef.current = ref)}
        style={styles.listStyle}
        data={moviesSections}
        keyExtractor={item => item.title.toString()}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        onEndReached={_.debounce(fetchNextYearsMovies, 300)}
        onEndReachedThreshold={0.7}
        onStartReached={_.debounce(fetchPrevYearsMovies, 300)}
        onStartReachedThreshold={0.5}
        // removeClippedSubviews
        // ListHeaderComponent={renderListHeader}
        // ListFooterComponent={renderListFooter}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
      {/* {isLoading && (
        <View style={styles.overlay}>
          <CircularLoader />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    marginHorizontal: 10,
    paddingBottom: 50,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.6,
  },
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
