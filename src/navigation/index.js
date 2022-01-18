import * as React from 'react';
import HomeScreen from '../screens/home';
import HolidayScreen from '../screens/holiday';
import ProfileScreen from '../screens/profile';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PhotosScreen from '../screens/photos';
import NotesScreen from '../screens/notes';

const Stack = createStackNavigator();

const AppNavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerBackTitle: ' ',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation, route}) => ({
          header: props => null,
        })}
      />
      <Stack.Screen
        name="Holiday"
        component={HolidayScreen}
        options={({navigation, route}) => ({
          header: props => null,
        })}
      />
      <Stack.Screen name="Photos" component={PhotosScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigationStack;
