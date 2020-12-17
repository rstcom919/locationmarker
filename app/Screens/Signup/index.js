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
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../redux/action.js';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
const logoImage = require('../../Assets/UI/mark1.png');
const backImage = require('../../Assets/UI/back1.png');
const mailIcon = require('../../Assets/UI/email_ico.png');
const passwordIcon = require('../../Assets/UI/password.png');
const photo_non = require('../../Assets/UI/photo_non.png');
const profileIcon = require('../../Assets/UI/profile.png');
const phoneIcon = require('../../Assets/UI/phone.png');

const screenHeight = Dimensions.get('window').height;

class Signup extends Component {
  state = {
    logoMarginAnim: new Animated.Value(screenHeight / 4),
    spinnerOpacityAnim: new Animated.Value(1),
    contentMarginAnim: new Animated.Value(30),
    contentOpacityAnim: new Animated.Value(0),
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    phone_number: '',
    uploadURL: '',
  };

  componentDidMount = () => {
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
        console.log('image', image)
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
  _handleSignup = () => {
    let user_info = {};
    let {
      first_name,
      last_name,
      password,
      email,
      phone_number,
      uploadURL,
    } = this.state;
    if (
      first_name == '' ||
      last_name == '' ||
      password == '' ||
      phone_number == '' ||
      email == ''
    )
      return alert('Please Enter Your Information!');
    this.props
      .registerUser(
        first_name,
        last_name,
        password,
        email,
        phone_number,
        uploadURL,
      )
      .then(result => {
        this.props
          .loginUser(email, password, 'email', user_info, true)
          .then(result => {
            alert(result.message);
            this.setState({password: ''});
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      });
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
    let navigate = this.props.navigation.navigate;
    return (
      <ImageBackground source={backImage} style={styles.backgroundImage}>
        <Animated.View
          style={[
            styles.spinnerContainer,
            {opacity: this.state.spinnerOpacityAnim},
          ]}>
          <ActivityIndicator size="small" color="#fff" />
        </Animated.View>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              //  zIndex: 999,
              // backgroundColor: '#00000090',
              marginLeft: 20,
              marginTop: 10,
              borderRadius: 17,
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={{color: 'white', fontSize: 16}}>{'Back'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity onPress={() => this.openPicker()}>
              {this.setImage()}
            </TouchableOpacity>
          </View>

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
              <View style={styles.phone_input}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={passwordIcon} style={styles.iconImage} />
                </View>
                <TextInput
                  ref={input => {
                    this.firstTextInput = input;
                  }}
                  style={styles.iteminput}
                  returnKeyType="next"
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  placeholder={'Password'}
                  secureTextEntry={true}
                  placeholderTextColor="gray"
                  autoCapitalize="none"
                  onChangeText={text => this.setState({password: text})}
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                  value={this.state.password}
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
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 9,
                    marginHorizontal: 10,
                    width: '90%',
                    height: 35,
                    backgroundColor: '#555555',
                  }}
                  onPress={this._handleSignup}>
                  <Text style={{color: 'white', fontSize: 16}}>{'SignUp'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <OrientationLoadingOverlay
          visible={this.props.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={12}
          message="Loading..."
        />
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    UserInfo: auth,
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
