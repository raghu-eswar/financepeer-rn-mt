import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider} from 'react-native-paper';
import {appTheme, COLOR} from './src/common/constants';
import AppNavigationStack from './src/navigation';
import {StatusBar} from 'react-native';
import {DB} from './src/database/db';

const App = () => {
  useEffect(() => {
    DB.init();
  }, []);
  return (
    <Provider theme={appTheme}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
      <NavigationContainer theme={appTheme}>
        <AppNavigationStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
