import React, { Component } from 'react';
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
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "#F54E6B"
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#F54E6B"
    },

    logoImage: {
        width: 150,
        height: 120,
        backgroundColor: 'red'
        //resizeMode: 'contain',
        //alignItems: 'center',
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
});

class Landing extends Component {
    state = {
        logoMarginAnim: new Animated.Value(screenHeight / 4),
        spinnerOpacityAnim: new Animated.Value(1),
        contentMarginAnim: new Animated.Value(30),
        contentOpacityAnim: new Animated.Value(0),
    }


    componentDidMount = () => {
        this.showSignInForm();
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

    render() {
        let navigate = this.props.navigation.navigate;

        return (
            <View style={styles.backgroundImage}>

                <Animated.View
                    style={[styles.spinnerContainer, { opacity: this.state.spinnerOpacityAnim }]}
                >
                    <ActivityIndicator size="small" color="#fff" />
                </Animated.View>

                <ScrollView style={styles.container}>
                    <Animated.View style={{ alignItems: 'center', marginTop: this.state.logoMarginAnim }}>
                        <View

                            style={styles.logoImage}
                        />
                    </Animated.View>

                    <Animated.View
                        style={{
                            marginTop: this.state.contentMarginAnim,
                            opacity: this.state.contentOpacityAnim,
                        }}
                    >
                        <Text style={styles.contentTitle}>
                            Have a good day!
                        </Text>
                        <View style={{ marginTop: 170 }}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 4,
                                    backgroundColor: 'transparent',
                                    borderWidth: 1,
                                    borderColor: '#ffffff',
                                }}
                                text="GETTING STARTED"
                                onPress={() => {
                                    navigate('Login')
                                    //navigate('Register')
                                }}
                            />
                        </View>
                        <Text style={styles.signUpText}>
                            {"Don't have an Yalo Account?\n"}
                            <Text
                                style={{ color: '#ffffff', fontWeight: 'bold', textDecorationLine: 'underline' }}
                                onPress={() => {
                                    navigate('Register')
                                }}
                            >
                                {'Singup now'}
                            </Text>
                        </Text>
                    </Animated.View>
                </ScrollView>
            </View>
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



