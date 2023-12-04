import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchedMovies} from '../../apis/movies';
import CircularLoader from '../../components/CircularLoader';
import {selectSearchedMovies} from '../../redux/selectors';
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
    setPage(1);
  }, []);

  const loadMore = () => {
    if (isLoading || page > totalPages) {
      return;
    }
    setPage(page + 1);
  };

  const renderBackfill = () => {
    if (!error) {
      return;
    }
    return (
      <View style={styles.emptyView}>
        <Text>No Movies Available</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (isLoading) {
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
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderBackfill}
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
  emptyView: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SearchPage);
