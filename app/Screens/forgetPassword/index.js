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
import axios from 'axios'
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
        loading: false,
        imageIndex: 0,
        email: "",
    }


    _handleBack = async () => {
        let navigation = this.props.navigation;
        navigation.goBack()
    }
    _handleSend = () => {
        let navigate = this.props.navigation.navigate;
        this.setState({ loading: true })
        let { email } = this.state;
        const data = { email }
        axios.post('http://placetracker.net/RestAPIs/sendEmailVerify', data)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false })
                    navigate('VerifyCodeScreen',{email})
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
                                    placeholder={"Email Address"}
                                    placeholderTextColor="gray"
                                    autoCapitalize="none"
                                    onChangeText={text => this.setState({ email: text })}
                                    value={this.state.email}
                                />
                            </View>


                            <View style={{ marginTop: 65, flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={this._handleBack}
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"Cancel"}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 9, marginHorizontal: 10, width: '40%', height: 35, backgroundColor: "#555555" }}
                                    onPress={this._handleSend}>
                                    <Text style={{ color: 'white', fontSize: 16,fontFamily: 'serif' }}>
                                        {"Send"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <OrientationLoadingOverlay
                    visible={this.state.loading}
                    color="white"
                    indicatorSize="large"
                    messageFontSize={12}
                    message="Sending..."
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



