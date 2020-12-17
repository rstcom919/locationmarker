import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator';
import {
  fromLeft,
  zoomIn,
  zoomOut,
  fromRight,
} from 'react-navigation-transitions';

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  if (
    prevScene &&
    prevScene.route.routeName === 'HomeScreen' &&
    nextScene.route.routeName === 'Profile'
  ) {
    return zoomIn();
  }
  return fromRight();
};
/**
 * Root Navigation stack
 * @type {NavigationContainer}
 */
const RootStack = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    //  LandingScreen: LandingScreen,
    Authentification: AuthNavigator,
    Application: MainNavigator,
    // TODO: SETTINGS HERE
  },
  {
    transitionConfig: nav => handleCustomTransition(nav),
    initialRouteName: 'Authentification',
  },
);

/**
 * managing your app state and linking your top-level navigator to the app environment
 * @type {NavigationContainer}
 */
export const AppContainer = createAppContainer(RootStack);
