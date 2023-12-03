import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MoviesPage from './src/pages/movies';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MoviesPage />
    </SafeAreaView>
  );
};

export default App;
