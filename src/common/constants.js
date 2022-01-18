import {DefaultTheme as DefaultThemeN} from '@react-navigation/native';
import {DefaultTheme as DefaultThemeP} from 'react-native-paper';

export const COLOR = {
  ...DefaultThemeN.colors,
  ...DefaultThemeP.colors,
  primary: '#6b00b2',
  primaryBackground: '#ebdef3',
  background: '#ffffff',
  primaryRipple: '#e6c5fa',
  statusbar: '#FFFFFF',
  progress: '#6b00b2',
  white: '#FFFFFF',
  black: '#000000',
  text: '#6b00b2',
  textPrimary: '#6C6C6C',
  textLight: '#b3b9c4',
  gray: '#808080',
  transparent: '#00000000',
  iconDark: '#6C6C6C',
  iconPrimary: '#6b00b2',
  loaderBackground: '#FFFFFFAA',
  smokeWhite: '#F5F5F5',
};

export const appTheme = {
  ...DefaultThemeN,
  ...DefaultThemeP,
  colors: COLOR,
};

export const OPEN_WEATHER_API_KEY = 'f77d6abc82fde83f42c491b3fbca1e30';
