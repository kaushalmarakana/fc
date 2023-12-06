import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import COLORS from '../../theme/colors';
import {Nullable} from '../../types';

type Props = {
  showLoader: Nullable<boolean>;
};

const ListLoaderView: React.FC<Props> = ({showLoader}) => {
  return (
    <View style={[styles.container, showLoader ? styles.show : styles.hide]}>
      <ActivityIndicator size="large" color={COLORS.loaderColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  errorView: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  tryAgain: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: COLORS.tryAgainBorderColor,
    borderWidth: 1,
  },
});

export default React.memo(ListLoaderView);
