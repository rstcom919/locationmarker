// @flow
import React, { Component, Fragment, useEffect } from 'react'
import {
  StatusBar,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,

  Alert
} from 'react-native'
import { Provider } from 'react-redux'
import ReduxThunk from "redux-thunk";
import reducers from "./redux/reducer"
import { createStore, applyMiddleware } from "redux";
import { AppContainer } from './Navigation/appNavigator';
import NavigationService from "./Helper/NavigationService";
import firebase from 'react-native-firebase';
/**
 * app Props description
 */
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor('#000000')
  }
  componentDidMount() {
   // this.requestCameraPermission();
    this.checkPermission();
    this.messageListener();
  }
  // useEffect(() => {
  //   this.checkPermission();
  //   this.messageListener();
  // }, [])

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  async  requestCameraPermission() {
    try {
      PermissionsAndroid.requestMultiple
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, ACCESS_NETWORK_STATE],
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
      </Provider>
    );
  }
}


