/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../../Components/navbar';
import {TabView, SceneMap} from 'react-native-tab-view';
import Profile from './components/profile';
import Friends from './components/friends';
import Places from './components/places';
import General from './components/general';

const backImage = require('../../Assets/UI/back1.png');

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: [],
      index: 0,
      routes: [
        {key: '1', title: 'Profile'},
        {key: '2', title: 'Friends'},
        {key: '3', title: 'Places '},
        {key: '4', title: 'General'},
      ],
    };
  }

  TabBar = props => {
    const routes = this.state.routes;
    const activeRouteIndex = this.state.index;
    const activeColor = 'gray';
    const inActiveColor = '#222';
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <FlatList
          data={routes}
          horizontal={true}
          extraData={this.state}
          initialScrollIndex={this.state.index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.setState({index: index});
                }}
                style={[
                  styles.tabItemWrapper,
                  {
                    borderColor: index == activeRouteIndex ? 'white' : 'gray',
                    borderBottomWidth: index == activeRouteIndex ? 3 : 3,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabItemText,
                    {color: index == activeRouteIndex ? 'white' : 'white'},
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  renderScene = ({route, jumpTo}) => {
    let navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        {route.key == '1' ? (
          <Profile />
        ) : route.key == '2' ? (
          <Friends />
        ) : route.key == '3' ? (
          <Places navigate={navigate} />
        ) : (
          <General />
        )}
      </View>
    );
  };
  render() {
    let navigate = this.props.navigation.navigate;
    return (
      <ImageBackground source={backImage} style={styles.backgroundImage}>
        <View style={styles.navbar}>
          <Navbar
            title={'Setting'}
            leftText={'Back'}
            rightText={''}
            leftAction={() => navigate('MainScreen')}
          />
        </View>
        <View
          style={[
            styles.container,
            {
              marginTop: 40,
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
            },
          ]}>
          <TabView
            initialLayout={{width: Dimensions.get('window').width}}
            navigationState={this.state}
            renderTabBar={this.TabBar}
            renderScene={this.renderScene}
            onIndexChange={index => this.setState({index})}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: "#F54E6B",
    resizeMode: 'contain',
    //   alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5E5E5E',
    borderBottomColor: '#dedede',
    //borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
    zIndex: 999,
  },
  tabItemWrapper: {
    paddingBottom: 5,
    paddingTop: 10,
    width: (Dimensions.get('window').width - 16) / 4 - 2,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 14,
    marginBottom: 0,
  },
  scene: {
    flex: 1,
  },
});
