import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectGenres} from '../../redux/selectors';
import {fetchGenres} from '../../apis/movies';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {GenreType} from '../../types';
import GenreTab from './GenreTab';

const GenresTabNav: React.FC = () => {
  const dispatch = useDispatch();
  const {genres, selectedGenres, isLoading} = useSelector(selectGenres);

  useEffect(() => {
    fetchGenres(dispatch);
  }, [dispatch]);

  const renderGenre: ListRenderItem<GenreType> = ({item}) => {
    return <GenreTab item={item} isSelected={!!selectedGenres?.[item.id]} />;
  };

  if (isLoading) {
    return (
      <View style={styles.genresView}>
        <Text>Genres Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.listStyle}
      horizontal
      data={genres}
      renderItem={renderGenre}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    padding: 10,
  },
  genresView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(GenresTabNav);
