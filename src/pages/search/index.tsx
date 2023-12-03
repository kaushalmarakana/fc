import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchedMovies} from '../../apis/movies';
import {Nullable} from '../../types';
import {selectSearchedMovies} from '../../redux/selectors';
import MovieCard from '../movies/MovieCard';
import CircularLoader from '../../components/CircularLoader';

type Props = {
  searchText: Nullable<string>;
};

const SearchPage: React.FC<Props> = ({searchText}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {isLoading, movies, error} = useSelector(selectSearchedMovies);

  useEffect(() => {
    fetchSearchedMovies(dispatch, searchText, page);
  }, [dispatch, searchText, page]);

  useEffect(() => {
    setPage(1);
  }, []);

  const loadMore = () => {
    if (isLoading) {
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
        renderItem={({item}) => <MovieCard item={item} />}
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  emptyView: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SearchPage);
