import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigationStack from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigationStack />
    </NavigationContainer>
  );
};

export default App;
