import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  message: string;
  onAction: () => void;
};

const RetryToast: React.FC<Props> = ({message, onAction}) => {
  return (
    <View style={styles.errorToastView}>
      <Text style={styles.errText}>{message}</Text>
      <Button onPress={onAction} title="Try Again" />
    </View>
  );
};

const styles = StyleSheet.create({
  errText: {color: 'white'},
  errorToastView: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'black',
    display: 'flex',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default React.memo(RetryToast);
