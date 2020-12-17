import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import LandingScreen from '../Screens/landing';
import SignupScreen from '../Screens/Signup';
import ForgetScreen from '../Screens/forgetPassword';
import VerifyCodeScreen from '../Screens/verifyCode';

import {
  fromLeft,
  zoomIn,
  zoomOut,
  fromRight,
} from 'react-navigation-transitions';

// import { MainStyle } from '../Styles'
// import Colors from '../Constants/Colors'
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
  // Custom transitions go there
  // if (prevScene
  //   && prevScene.route.routeName === 'ScreenA'
  //   && nextScene.route.routeName === 'ScreenB') {
  //   return zoomIn();
  // } else if (prevScene
  //   && prevScene.route.routeName === 'ScreenB'
  //   && nextScene.route.routeName === 'ScreenC') {
  //   return zoomOut();
  // }
  return fromRight();
};
/**
 * HomeScreen stack navigation
 * @type {NavigationContainer}
 */
const AuthStack = createStackNavigator(
  {
    Welcome: LandingScreen,
    Register: SignupScreen,
    ForgetScreen: ForgetScreen,
    VerifyCodeScreen,
    // Unlock: Authentification.UnlockAccountScreen,
    // Reset: Authentification.ResetPasswordScreen,
    // Activate: Authentification.ActivateAccountScreen,
  },

  {
    transitionConfig: nav => handleCustomTransition(nav),
    defaultNavigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
);

/**
 * export bottom tab stack navigation
 */
export default AuthStack;
