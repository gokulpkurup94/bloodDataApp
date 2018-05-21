import React from 'react';
import { StackNavigator   } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import AddNewScreen from './AddNewScreen';
import ViewDetailsScreen from './ViewDetailsScreen';

export default DefaultNavigation = StackNavigator(
    {
      Login: {
        screen: LoginScreen,
      },
      Home: {
        screen: HomeScreen,
      },
      AddNew:{
        screen:AddNewScreen
      },
      View:{
        screen:ViewDetailsScreen
      }
    },
    { 
      initialRouteName: 'Login',
    },
    {
      mode: 'card',
      cardStyle: { backgroundColor: 'transparent' },
      tintColor: '#ffffff',
      headerMode: 'screen'
    }
  );

