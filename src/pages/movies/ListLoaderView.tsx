import {StyleSheet, View} from 'react-native';
import React from 'react';
import CircularLoader from '../../components/CircularLoader';
import {Nullable} from '../../types';

type Props = {
  show: Nullable<boolean>;
};

const ListLoaderView: React.FC<Props> = ({show}) => {
  return (
    <View style={[styles.container, show ? styles.show : styles.hide]}>
      <CircularLoader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
});

export default React.memo(ListLoaderView);
