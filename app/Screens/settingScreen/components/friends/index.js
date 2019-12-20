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
    TextInput
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../../../redux/action.js"
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles'
const logoImage = require('../../../../Assets/UI/mark1.png');
const backImage = require('../../../../Assets/UI/back1.png');
const mailIcon = require('../../../../Assets/UI/email_ico.png');
const passwordIcon = require('../../../../Assets/UI/password.png');
const photo_non = require('../../../../Assets/UI/photo_non.png');
const profileIcon = require('../../../../Assets/UI/profile.png');
const phoneIcon = require('../../../../Assets/UI/phone.png');
const addFriend = require('../../../../Assets/UI/add_friend.png');


const screenHeight = Dimensions.get('window').height;


class Signup extends Component {
    state = {
        logoMarginAnim: new Animated.Value(screenHeight / 4),
        spinnerOpacityAnim: new Animated.Value(1),
        contentMarginAnim: new Animated.Value(30),
        contentOpacityAnim: new Animated.Value(0),
        uploadURL: null,
    }



    openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({ uploadURL: image.path })
        });
    }
    _pickImage = () => {
        const buttons = [
            'Open Camera',
            'Open photo library',
            'Cancel'
        ];
        const CANCEL_INDEX = 2;
        ActionSheet.showActionSheetWithOptions({
            options: buttons,
            cancelButtonIndex: CANCEL_INDEX,
            tintColor: 'blue'
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.openCamera()
                        break
                    case 1:
                        this.openPicker()
                        break
                    default:
                        return
                }
            });
    }
    setImage = () => {
        if (this.state.uploadURL) {
            return <Image
                source={{ uri: this.state.uploadURL }}
                style={{ marginTop: 0, width: 100, height: 100, borderRadius: 50 }}
            />
        }

        return <Image source={photo_non}
            style={{ marginTop: 0, width: 100, height: 100, borderRadius: 50 }}
        />
    }
    render() {
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            //  zIndex: 999,
                            // backgroundColor: '#00000090',
                            marginLeft: 25,
                            marginTop: 20,
                            borderRadius: 17,
                            flexDirection:'row'
                        }}
                        onPress={() => {}}
                    >
                        <Image
                            source={addFriend}
                            style={styles.iconImage}
                        />
                        <Text style={{ color: '#97B16C', fontSize: 16 }}>
                            {" Add Friend"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    <View
                        style={{
                            marginTop: 40
                        }}
                    >
                        </View>
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);



