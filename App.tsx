import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MoviesPage from './src/pages/movies';

const App = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <MoviesPage />
    </SafeAreaView>
  );
};

export default App;
