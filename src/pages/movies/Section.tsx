import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SectionType} from '../../types';
import MovieCard from './MovieCard';

type SectionProps = {
  item: SectionType;
};

const Section: React.FC<SectionProps> = ({item: section}) => {
  const renderBackfill = () => {
    return (
      <View style={styles.emptyView}>
        <Text>No Movies Available</Text>
      </View>
    );
  };
  return (
    <View key={section.title}>
      <Text style={styles.title}>{section.title}</Text>
      <FlatList
        data={section.data}
        keyExtractor={i => i.title}
        numColumns={2}
        ListEmptyComponent={renderBackfill}
        renderItem={({item}) => <MovieCard item={item} />}
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
