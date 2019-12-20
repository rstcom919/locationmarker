// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../../Components/navbar'
import Swiper from 'react-native-swiper'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
const backImage = require('../../Assets/UI/back1.png');
const follow_clk = require('../../Assets/UI/follow_clk.png');
const visitors = require('../../Assets/UI/visitors.png');
const dislike_clk = require('../../Assets/UI/dislike_non.png');
const like_non = require('../../Assets/UI/like_non.png');


let { width, height } = Dimensions.get('window');//Double

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
    }
    _reanderBrand = (data) => {
        return (
            <Image
                source={{ uri: data }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch' />
        )
    }
    render() {
        let navigate = this.props.navigation.navigate;
        let item = this.props.navigation.getParam('item');
        let { title, photos, address,posted_phone_number, note } = item;
        let temp = photos.toString();
        let photoArray = temp.split(",");
        photoArray.splice(0, 1);
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                <View style={styles.navbar}>
                    <Navbar
                        title={title}
                        leftText={"Back"}
                        rightText={""}
                        leftAction={() => navigate('MainScreen')}
                    />
                </View>
                <View style={{ width: '100%', flex: 4, paddingTop: 50,justifyContent: 'center', alignItems: 'center' }}>
                        <Swiper
                            style={{ width: width - 20, }}
                            autoplay={true}
                            dotColor='transparent'
                            activeDotColor='transparent'
                            //   paginationStyle={{ bottom: 0 }}
                            //   activeDotStyle={Style.SwipeDotStyle}
                            showsButtons={false}>
                            {
                                photoArray.map((item, index) => (

                                    this._reanderBrand(item)
                                ))
                            }
                        </Swiper>
                </View>
                <View style={{ width: '100%', flex: 9, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                        marginTop: 5
                    }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={visitors}
                                style={styles.iconImage}
                            />
                            <Text style={{ color: 'white' }}>{"0"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 90 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    source={like_non}
                                    style={styles.iconImage}
                                />
                                <Text style={{ color: 'white' }}>{"0"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Image
                                    source={dislike_clk}
                                    style={[styles.iconImage, { paddingTop: 5 }]}
                                />
                                <Text style={{ color: 'white' }}>{"0"}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={follow_clk}
                                style={styles.iconImage}
                            />
                        </View>
                    </View>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Address: </Text>
                        <Text style={styles.contentTextStyle}>{address}</Text>
                    </View>
                    <View style={[styles.phone_input,{flexDirection:'row'}]}>
                        <Text style={styles.leftTextStyle}>Phon Number: </Text>
                        <Text style={{ textAlignVertical: 'center', color:'#AECE74', fontSize:14}}>{" "+posted_phone_number}</Text>
                    </View>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Note: </Text>
                        <Text style={styles.contentTextStyle}>{note}</Text>
                    </View>
                </View>
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
        flexDirection: 'column',
        marginVertical: 10,
        
    },
    iteminput: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
        color: 'white'
    },
    iconImage: {
        width: 22,
        height: 26,
        resizeMode: 'stretch',
        alignItems: 'center',
        // tintColor: 'white'
    },
    leftTextStyle: {
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        textAlignVertical: 'center'
    },
    contentTextStyle: {
        fontSize: 14,
        paddingLeft:5,
        textAlign: 'left',
        color: 'white',
        textAlignVertical: 'center'
    }
});