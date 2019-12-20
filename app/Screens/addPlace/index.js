/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    TextInput, PermissionsAndroid,
    Platform, StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, TouchableOpacity
} from 'react-native';
import Navbar from '../../Components/navbar'
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"
import ActionSheet from 'react-native-actionsheet'

const backImage = require('../../Assets/UI/back1.png');
const myLocation = require('../../Assets/UI/myLocation.png');
let { width, height } = Dimensions.get('window');//Double



 class App extends Component {
     
        state = {
            region: {
            },
            loading: false,
            mapType: 'standard',
            images: [],
            title: "",
            address: "",
            note: ""
        }
   
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    componentDidMount() {
        this.requestCameraPermission()
    }
    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(nImages => {
            const { images } = this.state
            let image = images.concat(nImages);
            this.setState({ images: image });
        })
    }
    openPicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            width: 500,
            height: 500,
            cropping: true,
            cropperToolbarTitle: 'Crop photo untuk mendapatkan gambar yang bagus',
            includeBase64: true
        }).then(nImages => {
            const { images } = this.state
            let image = images.concat(nImages);
            this.setState({ images: image });
        })
    }
    _reanderBrand = (image) => {
        return (
            <Image
                source={{ uri: image.path }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch' />
        )
    }
    async  requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    _savePlace = () => {
        let { id, phone_number } = this.props.UserInfo;
        let region = this.props.navigation.getParam('region');
        let {latitude ,longitude } = region;
        let { images, title, address, note } = this.state;
        const data = new FormData();
        data.append('user_id', id); // you can append anyone.
        data.append('title', title);
        data.append('posted_phone_number', phone_number);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('address', address);
        data.append('note', note);
        images.map((item, index) => {
            var filename = item.path.replace(/^.*[\\\/]/, '')
            data.append(`photo${index}`, {
                uri: item.path,
                type: 'image/jpg', // or photo.type
                name: filename
            });
        })
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
       // console.log(data)
        const url = "http://placetracker.net/RestAPIs/addPlaceRequest";
        axios.post(url, data, config)
            .then(res => {
                console.log(res)
                // if (res.data.status) {
                //     this.setState({ searchPlaces: res.data.places, loading: false })
                // }
                // else {
                //     this.setState({ loading: false })
                //     console.log("error")
                // }
            })

    }
    render() {
        let navigate = this.props.navigation.navigate;
        let { images } = this.state;
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                <View
                
                 style={styles.navbar}>
                    <Navbar
                        title={"Add Place"}
                        leftText={"Back"}
                        rightText={"Save"}
                        leftAction={() => navigate('SelectNewPlaceScreen')}
                        rightAction={this._savePlace}
                    />
                </View>
                <View style={{ width: '100%', flex: 4, paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        backgroundColor: '#B8B8B8',
                        width: width - 20, justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={this.showActionSheet}
                    >
                        {images.length > 0 ? <Swiper
                            style={{ width: width - 20, }}
                            autoplay={true}
                            dotColor='transparent'
                            activeDotColor='transparent'
                            //   paginationStyle={{ bottom: 0 }}
                            //   activeDotStyle={Style.SwipeDotStyle}
                            showsButtons={false}>
                            {
                                images.map((item, index) => (

                                    this._reanderBrand(item)
                                ))
                            }
                        </Swiper> : <Text style={{ color: 'white', fontSize: 16 }}>
                                {"Click here to select images for new place"}
                            </Text>}
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flex: 9, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Title: </Text>
                        <TextInput
                            spellCheck={false}
                            autoCorrect={false}
                            ref={(input) => { this.firstTextInput = input; }}
                            style={styles.iteminput}
                            returnKeyType="next"
                            autoFocus={false}
                            underlineColorAndroid="white"
                            placeholder={"Input New Title"}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ title: text })}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            value={this.state.title}
                        />
                    </View>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Address: </Text>
                        <TextInput
                            showSoftInputOnFocus={false}
                            spellCheck={false}
                            autoCorrect={false}
                            ref={(input) => { this.secondTextInput = input; }}
                            style={styles.iteminput}
                            returnKeyType="next"
                            autoFocus={false}
                            underlineColorAndroid="white"
                            placeholder={"Input New Address"}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ address: text })}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            value={this.state.address}
                        />
                    </View>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Note: </Text>
                        <TextInput
                            spellCheck={false}
                            autoCorrect={false}
                            ref={(input) => { this.thirdTextInput = input; }}
                            style={styles.iteminput}
                            returnKeyType="next"
                            autoFocus={false}
                            underlineColorAndroid="transparent"
                            placeholder={"Input about new place"}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ note: text })}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            value={this.state.note}
                        />
                    </View>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Which one do you like ?'}
                    options={['Open Camera',
                        'Open photo library',
                        'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        switch (index) {
                            case 0:
                                this.openCamera()
                                break
                            case 1:
                                this.openPicker()
                                break
                            default:
                                return
                        }
                    }}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#5E5E5E',
        borderBottomColor: '#dedede',
        height: 40,
        justifyContent: 'center',
        zIndex: 999
    },
    phone_input: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
    },
    iteminput: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
        color: 'white'
    },
    leftTextStyle: { fontSize: 16, textAlign: 'center', color: 'white', textAlignVertical: 'center' }
});

const mapStateToProps = ({ auth }) => {
    return {
        UserInfo: auth.user,
        loading: auth.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

