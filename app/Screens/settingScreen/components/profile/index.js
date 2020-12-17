import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Animated,
  View,
  Easing,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../../../redux/action.js';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
const logoImage = require('../../../../Assets/UI/mark1.png');
const backImage = require('../../../../Assets/UI/back1.png');
const mailIcon = require('../../../../Assets/UI/email_ico.png');
const passwordIcon = require('../../../../Assets/UI/password.png');
const photo_non = require('../../../../Assets/UI/photo_non.png');
const profileIcon = require('../../../../Assets/UI/profile.png');
const phoneIcon = require('../../../../Assets/UI/phone.png');

const screenHeight = Dimensions.get('window').height;

class Signup extends Component {
  state = {
    logoMarginAnim: new Animated.Value(screenHeight / 4),
    spinnerOpacityAnim: new Animated.Value(1),
    contentMarginAnim: new Animated.Value(30),
    contentOpacityAnim: new Animated.Value(0),
    uploadURL: null,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  };

  componentDidMount = () => {
    let {first_name, last_name, email, phone_number} = this.props.UserInfo;
    this.setState({first_name, last_name, email, phone_number});

    this.showSignInForm();
  };
  showSignInForm = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.spinnerOpacityAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.elastic(),
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.contentMarginAnim, {
          toValue: 20,
          duration: 800,
        }),
        Animated.timing(this.state.contentOpacityAnim, {
          toValue: 1,
          duration: 800,
        }),
      ]),
    ]).start();
  };
  openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({uploadURL: image.path});
    });
  };
  _pickImage = () => {
    const buttons = ['Open Camera', 'Open photo library', 'Cancel'];
    const CANCEL_INDEX = 2;
    ActionSheet.showActionSheetWithOptions(
      {
        options: buttons,
        cancelButtonIndex: CANCEL_INDEX,
        tintColor: 'blue',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.openCamera();
            break;
          case 1:
            this.openPicker();
            break;
          default:
            return;
        }
      },
    );
  };
  setImage = () => {
    if (this.state.uploadURL) {
      return (
        <Image
          source={{uri: this.state.uploadURL}}
          style={{marginTop: 0, width: 100, height: 100, borderRadius: 50}}
        />
      );
    }

    return (
      <Image
        source={photo_non}
        style={{marginTop: 0, width: 100, height: 100, borderRadius: 50}}
      />
    );
  };

  render() {
    return (
      <ImageBackground source={backImage} style={styles.backgroundImage}>
        <Animated.View
          style={[
            styles.spinnerContainer,
            {opacity: this.state.spinnerOpacityAnim},
          ]}>
          <ActivityIndicator size="small" color="#fff" />
        </Animated.View>

        <ScrollView style={styles.container}>
          <Animated.View
            style={{
              marginTop: this.state.contentMarginAnim,
              opacity: this.state.contentOpacityAnim,
            }}>
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.phone_input}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={profileIcon} style={styles.iconImage} />
                </View>
                <TextInput
                  ref={input => {
                    this.firstTextInput = input;
                  }}
                  style={styles.iteminput}
                  returnKeyType="next"
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder={'First Name'}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={text => this.setState({first_name: text})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  value={this.state.first_name}
                />
              </View>
              <View style={styles.phone_input}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={profileIcon} style={styles.iconImage} />
                </View>
                <TextInput
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  style={styles.iteminput}
                  returnKeyType="next"
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder={'Last Name'}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={text => this.setState({last_name: text})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  value={this.state.last_name}
                />
              </View>
              <View style={styles.phone_input}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={mailIcon} style={styles.iconImage} />
                </View>
                <TextInput
                  ref={input => {
                    this.firstTextInput = input;
                  }}
                  style={styles.iteminput}
                  returnKeyType="next"
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder={'Email Address'}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={text => this.setState({email: text})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  value={this.state.email}
                />
              </View>
              <View style={styles.phone_input}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={phoneIcon} style={styles.iconImage} />
                </View>
                <TextInput
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  style={styles.iteminput}
                  returnKeyType="next"
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder={'Phone Number'}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={text => this.setState({phone_number: text})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  value={this.state.phone_number}
                />
              </View>

              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={this._handleLogin}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 9,
                    marginHorizontal: 10,
                    width: '40%',
                    height: 35,
                    backgroundColor: '#555555',
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 9,
                    marginHorizontal: 10,
                    width: '40%',
                    height: 35,
                    backgroundColor: '#555555',
                  }}
                  onPress={() => {
                    navigate('Register');
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>{'SAVE'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    UserInfo: auth.user,
    loading: auth.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
