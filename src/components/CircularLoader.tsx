import {ActivityIndicator} from 'react-native';
import React from 'react';
import COLORS from '../theme/colors';

const CircularLoader: React.FC = () => {
  return <ActivityIndicator size="large" color={COLORS.loaderColor} />;
};

export default React.memo(CircularLoader);
