/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Slider } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: 10000,
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', width:'100%'}}>
          <Text style={styles.welcome}>Map Size:   </Text>
          <Text style={styles.instructions}>{String(value)+"m"}</Text>
        </View>

        <Slider
          step={100}
          maximumValue={50000}
          minimumTrackTintColor='#0079ED'
          onValueChange={this.change.bind(this)}
          value={value}
          style={{ width: '100%' }}
          maximumTrackTintColor='white'
          thumbTintColor='white'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: 30,
    alignItems: 'center',
    width: '100%'
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    paddingLeft:30,
    textAlign: 'center',
    color:'white',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 20,
  },
});
