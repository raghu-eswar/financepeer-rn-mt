import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../common/constants';

const BottomTabButton = ({height, width, icon, label, selected, onPress}) => {
  if (selected) {
    return (
      <View
        style={[
          styles.center,
          styles.container,
          {
            height: height,
          },
        ]}>
        <View
          style={[
            styles.selectedButton,
            {
              borderRadius: height / 2,
              bottom: height - width / 3,
            },
          ]}>
          <TouchableRipple
            style={[
              styles.center,
              {
                width: height,
                height: height,
                borderRadius: height / 2,
              },
            ]}
            rippleColor={COLOR.primaryRipple}
            borderless>
            <MaterialCommunityIcons
              name={icon}
              size={height / 2}
              color={COLOR.iconPrimary}
            />
          </TouchableRipple>
        </View>
        <Text style={styles.textSelected}>{label}</Text>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          height: height,
        },
      ]}>
      <TouchableRipple
        style={[
          styles.center,
          styles.container,
          {
            height: height,
          },
        ]}
        rippleColor={COLOR.primaryRipple}
        borderless
        onPress={onPress}>
        <>
          <MaterialCommunityIcons
            name={icon}
            size={height / 2 - 8}
            color={COLOR.textLight}
          />
          <Text style={styles.text}>{label}</Text>
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    justifyContent: 'space-evenly',
    borderRadius: 35,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
    color: COLOR.textLight,
    fontSize: 12,
  },
  textSelected: {
    fontWeight: '500',
    color: COLOR.primary,
    fontSize: 12,
    paddingTop: 24,
  },
});

export default BottomTabButton;
