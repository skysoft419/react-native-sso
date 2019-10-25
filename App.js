/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import SignUp from "./screen/Signup";
import LoginScreen from "./screen/Login";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';


type Props = {};
const TabScreen = createMaterialTopTabNavigator(
    {
      Login: { screen: LoginScreen},
      SignUp: { screen: SignUp},
    },
    {
      tabBarPosition: 'top',
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: '#252525',
        inactiveTintColor: '#4a4a4a',
        pressColor: 'gray',
        style: {
          backgroundColor: '#fff',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          backgroundColor: '#4a4a4a',
          borderColor: 'rgb(189,189,189)',
          borderWidth: 1,
          borderBottomWidth: 0,
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    {
      initialRouteName: "Signup"
    }

);


const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        height:150,
      },
      headerTintColor: '#FF7F3D',
      title: 'Techno Homes',
      headerTitleStyle: { flex: 1, textAlign: 'center'},

    },
  },
});
export default createAppContainer(App);
