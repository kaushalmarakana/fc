import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SectionType} from '../../types';
import MovieCard from './MovieCard';

type SectionProps = {
  item: SectionType;
};

const Section: React.FC<SectionProps> = ({item: section}) => {
  return (
    <View key={section.title}>
      <Text style={styles.title}>{section.title}</Text>
      <FlatList
        data={section.data}
        keyExtractor={i => i.title}
        numColumns={2}
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
});

export default React.memo(Section);
