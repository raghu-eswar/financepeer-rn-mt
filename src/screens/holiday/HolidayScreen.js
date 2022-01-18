import React from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel from '../../components/carousel';
import HandleBack from '../../components/HandleBack';

const HolidayScreen = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <HandleBack onBack={onBack}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Carousel />
        </View>
      </View>
    </HandleBack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
});
export default HolidayScreen;
