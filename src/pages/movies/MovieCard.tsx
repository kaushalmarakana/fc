import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MovieItemType} from '../../types';

type MovieViewProps = {
  item: MovieItemType;
};

const MovieView: React.FC<MovieViewProps> = ({item}) => {
  const imagesBaseUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${imagesBaseUrl}${item.poster_path}`,
        }}
        resizeMode="contain"
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.ratings} numberOfLines={2}>
          Ratings : {item.vote_average}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: 320,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  poster: {
    width: '100%',
    height: 260,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  info: {
    alignItems: 'center',
    padding: 5,
    height: 80,
    justifyContent: 'center',
  },
  ratings: {
    marginTop: 5,
  },
});

export default React.memo(MovieView);
