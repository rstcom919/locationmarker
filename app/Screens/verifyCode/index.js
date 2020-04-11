import React, { Component } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';//`${ADMIN_ENDPOINT}register`
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { ActionCreators } from "../../redux/action.js"

const logoImage = require('../../Assets/UI/mark1.png');
const backImage = require('../../Assets/UI/back1.png');
const mailIcon = require('../../Assets/UI/email_ico.png');
const passwordIcon = require('../../Assets/UI/password.png');




const screenHeight = Dimensions.get('window').height;

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
        padding: 30,
        //   backgroundColor: "#F54E6B"
    },
    logoImage: {
        width: 150,
        height: 120,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    spinnerContainer: {
        position: 'absolute',
        bottom: (screenHeight / 2) - 60,
        left: 0,
        right: 0,
    },
    contentTitle: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
    },

    signUpText: {
        marginTop: 40,
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
    },
    phone_input: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        // shadowOffset: {
        //   width: 0,
        //   height: 1
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        // elevation: 2
    },
    iteminput: {
        color: 'white',
        fontFamily: 'serif'
    }
});
const animationImages = [
    require('../../Assets/UI/mark1.png'),
    require('../../Assets/UI/mark1.png'),
    require('../../Assets/UI/mark1.png'),
    require('../../Assets/UI/mark1.png'),
    require('../../Assets/UI/mark1.png'),]
class Landing extends Component {
    state = {
        imageIndex: 0,
        veri_code: "",
        new_password: "",
        email:""
    }
    
  
    _handleBack = async () => {
        let navigation = this.props.navigation;
        navigation.goBack()
    }
    verifyFunc = () =>{
        let email = this.props.navigation.getParam('email');
        let navigate = this.props.navigation.navigate;
        this.setState({ loading: true })
        let { veri_code, new_password } = this.state;
        const data = { email,veri_code, new_password  }
        axios.post('http://placetracker.net/RestAPIs/recoveryPassword', data)
            .then(res => {
                console.log("verify--", res.data)
                if (res.data.status) {
                    this.setState({ loading: false })
                    navigate('MainScreen')
                }
                else {
                    this.setState({ loading: false })
                    console.log("error")
                }
            })
    }
    render() {
        let navigate = this.props.navigation.navigate;
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                 <ScrollView style={styles.container}>
                    <View style={{ alignItems: 'center', marginTop: 70 }}>
                        <Image
                            source={animationImages[this.state.imageIndex]}
                            style={styles.logoImage}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 30
                        }}
                    >
                        <View style={{ marginTop: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.phone_input} >
                                <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={mailIcon}
                                        style={styles.iconImage}
                                    />
                                </View>
                                <TextInput
                                    ref={(input) => { this.firstTextInput = input; }}
                                    style={styles.iteminput}
                                    returnKeyType="next"
                                    autoFocus={false}
                                    underlineColorAndroid="transparent"
                                    placeholder={"Verify Code"}
                                    placeholderTextColor="gray"
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ veri_code: text })}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    value={this.state.veri_code}
                                />
                            </View>
                            <View style={styles.phone_input} >
                                <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={passwordIcon}
                                        style={styles.iconImage}
                                    />
                                </View>
                                <TextInput
                                    ref={(input) => { this.secondTextInput = input; }}
                                    style={styles.iteminput}
                                    returnKeyType="next"
                                    autoFocus={false}
                                    underlineColorAndroid="transparent"
                                    placeholder={"Password"}
                                    placeholderTextColor="gray"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ new_password: text })}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    value={this.state.new_password}
                                />
                            </View>
                          
                            <View style={{ marginTop: 15, flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={this._handleBack}
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"Cancel"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}
                                    onPress={this.verifyFunc}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"Verify"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
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
const mapStateToProps = ({ auth }) => {
    return {
        UserInfo: auth,
        loading: auth.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);



