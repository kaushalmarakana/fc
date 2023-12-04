import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {MovieItemType, SectionType} from '../../types';
import MovieCard from './MovieCard';

type SectionProps = {
  item: SectionType;
};

const Section: React.FC<SectionProps> = ({item: section}) => {
  const renderBackfill = useCallback(() => {
    return (
      <View style={styles.emptyView}>
        <Text>No Movies Available</Text>
      </View>
    );
  }, []);

  const renderItem: ListRenderItem<MovieItemType> = useCallback(
    ({item}) => <MovieCard item={item} />,
    [],
  );

  return (
    <View key={section.title}>
      <Text style={styles.title}>{section.title}</Text>
      <FlatList
        data={section.data}
        keyExtractor={i => i.title}
        numColumns={2}
        ListEmptyComponent={renderBackfill}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptyView: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(Section);
