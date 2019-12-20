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
    FlatList
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
    _gotoDetail = (item) => {
        console.log("item--", item)
        let { navigate } = this.props
        navigate('DetailPlace', { item })
    }
    render() {
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                <ScrollView style={styles.container}>
                    <View
                        style={{
                            marginTop: 30
                        }}
                    >  
                     <FlatList
                            extraData={this.props}
                            data={this.props.places}
                            horizontal={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={styles.phone_input} onPress={()=>this._gotoDetail(item)}>
                                    <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text
                                            style={{ color: '#97B16C' }}>{index}.</Text>
                                    </View>
                                    <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text
                                            style={{ color: 'white' }}>   {item.title}</Text>
                                    </View>
                                </TouchableOpacity>

                            }}
                            keyExtractor={(index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        UserInfo: auth,
        places: auth.places,
        loading: auth.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);



