import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchedMovies} from '../../apis/movies';
import CircularLoader from '../../components/CircularLoader';
import {moviesSearchListReset} from '../../redux/actions/searchActions';
import {selectSearchedMovies} from '../../redux/selectors';
import COLORS from '../../theme/colors';
import {MovieItemType, Nullable} from '../../types';
import MovieCard from '../movies/MovieCard';
import RetryToast from '../../components/RetryToast';

type Props = {
  searchText: Nullable<string>;
};

const SearchPage: React.FC<Props> = ({searchText}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {isLoading, movies, error, totalPages} =
    useSelector(selectSearchedMovies);

  useEffect(() => {
    fetchSearchedMovies(dispatch, searchText, page);
  }, [dispatch, searchText, page]);

  useEffect(() => {
    dispatch(moviesSearchListReset());
    setPage(1);
  }, [dispatch, searchText]);

  const tryAgain = () => {
    fetchSearchedMovies(dispatch, searchText, page);
  };

  const loadMore = () => {
    if (isLoading || page > totalPages || error) {
      return;
    }
    setPage(page + 1);
  };

  const renderBackfill = () => {
    if (!error && !isLoading && !movies.length) {
      return (
        <View style={styles.emptyView}>
          <Text>No Movies Available</Text>
        </View>
      );
    }
  };

  const renderTopLoader = () => {
    if (isLoading && page === 1) {
      return <CircularLoader />;
    }
    return null;
  };

  const renderBottomLoader = () => {
    if (isLoading && page > 1) {
      return <CircularLoader />;
    }
    return null;
  };

  const renderItem: ListRenderItem<MovieItemType> = useCallback(
    ({item}) => <MovieCard item={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      {renderTopLoader()}
      {renderBackfill()}
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
        renderItem={renderItem}
      />
      {error && <RetryToast message={error} onAction={tryAgain} />}
      {renderBottomLoader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorView: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  tryAgain: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: COLORS.tryAgainBorderColor,
    borderWidth: 1,
  },
  emptyView: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SearchPage);
