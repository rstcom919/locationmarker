import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { fromLeft, zoomIn, zoomOut } from 'react-navigation-transitions'

import MainScreen from '../Screens/mainScreen'
import SettingScreen from '../Screens/settingScreen'
import SelectNewPlaceScreen from '../Screens/selectNewPlace'
import AddPlace from '../Screens/addPlace'
import DetailPlace from '../Screens/detailPlace'
import EditPlace from '../Screens/editPlace'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  if (prevScene
    && prevScene.route.routeName === 'HomeScreen'
    && nextScene.route.routeName === 'Profile') {
    return zoomIn();
  } 
  return fromLeft();
}

const defaultNavigationOptions = {
   header: null
}

/**
 * HomeScreen stack navigation
 * @type {NavigationContainer}
 */
const HomeStack = createStackNavigator({
    MainScreen,
    SettingScreen,
    SelectNewPlaceScreen,
    AddPlace,
    DetailPlace,
    EditPlace  
}, {
  transitionConfig: (nav) => handleCustomTransition(nav),
    defaultNavigationOptions: ({
      navigation
    }) => {
      return {
        header: null,
      };
    }
  }
)

/**
 * export bottom tab stack navigation
 */
export default HomeStack;
