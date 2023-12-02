import {ActivityIndicator} from 'react-native';
import React from 'react';

const CircularLoader: React.FC = () => {
  return <ActivityIndicator size="large" color="black" />;
};

export default React.memo(CircularLoader);
