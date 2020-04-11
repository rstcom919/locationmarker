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
        logoMarginAnim: new Animated.Value(screenHeight / 4),
        spinnerOpacityAnim: new Animated.Value(1),
        contentMarginAnim: new Animated.Value(30),
        contentOpacityAnim: new Animated.Value(0),
        imageIndex: 0,
        userName: "",
        password: ""
    }
    componentDidMount = () => {
        this.autoLogin()
        this.splashHandler = setInterval(() => {
            this.disableSplashScreen()
        }, 2000)
        this.showSignInForm();
        setInterval(() => {
            var imageIndex = this.state.imageIndex + 1;
            if (imageIndex >= animationImages.length) {
                imageIndex = 0;
            }
            this.setState({ imageIndex: imageIndex })
        }, 1000);
    }
    disableSplashScreen() {
        SplashScreen.hide()
        clearInterval(this.splashHandler)
    }
    async autoLogin() {
        let user_info = {}
        const logedin = await AsyncStorage.getItem("logedin")
        const email = await AsyncStorage.getItem("loginname")
        const password = await AsyncStorage.getItem("password")
        if (logedin === "true")
            this.props.loginUser(email, password, "email", user_info, true).then((result) => {
                alert(result.message)
                this.setState({ password: "" })
            }).catch((error) => {
                alert(error)
            })
    }
    showSignInForm = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.logoMarginAnim,
                    {
                        toValue: 70,
                        duration: 1000,
                        easing: Easing.elastic(),
                    },
                ),
                Animated.timing(
                    this.state.spinnerOpacityAnim,
                    {
                        toValue: 0,
                        duration: 800,
                        easing: Easing.elastic(),
                    },
                ),
            ]),
            Animated.parallel([
                Animated.timing(
                    this.state.contentMarginAnim,
                    {
                        toValue: 20,
                        duration: 800,
                    },
                ),
                Animated.timing(
                    this.state.contentOpacityAnim,
                    {
                        toValue: 1,
                        duration: 800,
                    },
                ),
            ]),
        ]).start();
    }
    _handleLogin = async () => {
        let user_info = {}
        let { userName, password } = this.state
        if (userName == "" || password == "") return alert("Please Enter Your Information!")
        this.props.loginUser(userName, password, "email", user_info, true).then((result) => {
            alert(result.message)
            this.setState({ password: "" })
        }).catch((error) => {
            alert(error)
        })
    }

    render() {
        let navigate = this.props.navigation.navigate;

        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>

                <Animated.View
                    style={[styles.spinnerContainer, { opacity: this.state.spinnerOpacityAnim }]}
                >
                    <ActivityIndicator size="small" color="#fff" />
                </Animated.View>

                <ScrollView style={styles.container}>
                    <Animated.View style={{ alignItems: 'center', marginTop: this.state.logoMarginAnim }}>
                        <Image
                            source={animationImages[this.state.imageIndex]}
                            style={styles.logoImage}
                        />
                    </Animated.View>

                    <Animated.View
                        style={{
                            marginTop: this.state.contentMarginAnim,
                            opacity: this.state.contentOpacityAnim,
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
                                    placeholder={"Email Address"}
                                    placeholderTextColor="gray"
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ userName: text })}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    value={this.state.userName}
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
                                    onChangeText={text => this.setState({ password: text })}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    value={this.state.password}
                                />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Text style={{ color: 'yellow',fontFamily: 'serif' }} onPress={() => navigate('ForgetScreen')}>
                                    {"Forget Password?"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={this._handleLogin}
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"SignIn"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}
                                    onPress={() => { navigate('Register') }}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"SignUp"}
                                    </Text>
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



