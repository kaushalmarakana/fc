import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Nullable} from '../../types';
import React from 'react';
import COLORS from '../../theme/colors';

type ErrorBackfillProps = {
  initialPaintFailed: Nullable<boolean>;
  error: Nullable<string>;
  onRetry: () => void;
};

const ErrorBackfill: React.FC<ErrorBackfillProps> = ({
  initialPaintFailed,
  error,
  onRetry,
}) => {
  if (!initialPaintFailed) {
    return null;
  }
  return (
    <View style={styles.backfill}>
      <Text>{error}</Text>
      <TouchableOpacity style={styles.tryAgainBtn} onPress={onRetry}>
        <Text>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  tryAgainBtn: {
    height: 40,
    width: 100,
    borderColor: COLORS.tryAgainBorderColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  backfill: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default React.memo(ErrorBackfill);
