import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOR} from '../common/constants';

const Loader = ({transparent = true, size = 'large'}) => {
  return (
    <View
      style={[
        styles.loader,
        {
          backgroundColor: transparent ? COLOR.loaderBackground : COLOR.white,
        },
      ]}>
      <ActivityIndicator
        style={styles.loader}
        animating={true}
        size={size}
        color={COLOR.progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    elevation: 1000,
  },
});

export default Loader;
