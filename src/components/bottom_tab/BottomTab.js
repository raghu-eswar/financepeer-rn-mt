import React, {useMemo} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {COLOR} from '../../common/constants';
import BottomTabButton from './BottomTabButton';
import {useNavigation} from '@react-navigation/native';

const BottomTab = ({user}) => {
  const {width, height} = useWindowDimensions();
  const pad = 12;
  const barWidth = width - 2 * pad;
  const widthPart = barWidth / 7;
  const barHeight = Math.max(55, widthPart);
  const svgPath = useMemo(
    () =>
      `M ${pad + widthPart / 2} 0 l ${2 * widthPart} 0 c${widthPart / 2} 0 ${
        widthPart / 2
      } ${widthPart / 2} ${widthPart} ${widthPart / 2} c ${widthPart / 2} 0 ${
        widthPart / 2
      } -${widthPart / 2} ${widthPart} -${widthPart / 2} l ${
        widthPart * 2
      } 0 a 1 1 0 0 1 0 ${barHeight} l -${
        widthPart * 6
      } 0 a 1 1 0 0 1 0 -${barHeight}`,
    [pad, widthPart, barHeight],
  );
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.absolute,
        {
          bottom: pad,
        },
      ]}>
      <Svg
        version="1.1"
        id="bottom-bar"
        x="0px"
        y="0px"
        width={width}
        height={barHeight}
        space="preserve"
        style={styles.svg}>
        <Path fill={COLOR.white} stroke={COLOR.white} d={svgPath} />
      </Svg>
      <View style={[styles.absolute, styles.container, {elevation: 50}]}>
        <BottomTabButton
          label={'Holiday'}
          icon={'airplane-takeoff'}
          height={barHeight}
          width={widthPart}
          onPress={() => navigation.navigate('Holiday')}
        />
        <BottomTabButton
          label={'Notes'}
          icon={'clipboard-text'}
          height={barHeight}
          width={widthPart}
          onPress={() => navigation.navigate('Notes')}
        />
        <BottomTabButton
          label={'Home'}
          icon={'home'}
          selected
          height={barHeight}
          width={widthPart}
        />
        <BottomTabButton
          label={'Photos'}
          icon={'camera-iris'}
          height={barHeight}
          width={widthPart}
          onPress={() => navigation.navigate('Photos')}
        />
        <BottomTabButton
          label={'Profile'}
          icon={'account'}
          height={barHeight}
          width={widthPart}
          onPress={() => navigation.navigate('Profile', {user: user})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 12,
  },
  svg: {
    elevation: 36,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 36,
    },
    shadowRadius: 36,
    shadowOpacity: 0.2,
  },
});

export default BottomTab;
