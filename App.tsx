import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MoviesPage from './src/pages/movies';
import SearchPage from './src/pages/search';
import {Nullable} from './src/types';
import _ from 'lodash';

const App = () => {
  const [searchText, setSearchText] = useState<Nullable<string>>();

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="search"
        style={styles.input}
        onChangeText={_.debounce(onChangeText, 500)}
      />
      {searchText ? <SearchPage searchText={searchText} /> : <MoviesPage />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});

export default App;
