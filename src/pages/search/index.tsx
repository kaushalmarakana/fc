import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchedMovies} from '../../apis/movies';
import CircularLoader from '../../components/CircularLoader';
import {moviesSearchListReset} from '../../redux/actions/searchActions';
import {selectSearchedMovies} from '../../redux/selectors';
import COLORS from '../../theme/colors';
import {MovieItemType, Nullable} from '../../types';
import MovieCard from '../movies/MovieCard';

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
    if (error && !isLoading && !movies.length) {
      return renderTryAgain();
    }
  };

  const renderHeader = () => {
    if (isLoading && page === 1) {
      return <CircularLoader />;
    }
    return null;
  };

  const renderTryAgain = () => {
    return (
      <View style={styles.errorView}>
        <Text>Error : {error}</Text>
        <TouchableOpacity style={styles.tryAgain} onPress={tryAgain}>
          <Text>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    if (isLoading && page > 1) {
      return <CircularLoader />;
    }
    if (error && page > 1) {
      return renderTryAgain();
    }
    return null;
  };

  const renderItem: ListRenderItem<MovieItemType> = useCallback(
    ({item}) => <MovieCard item={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
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
      {renderFooter()}
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
