// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import Navbar from '../../Components/navbar'
import Swiper from 'react-native-swiper'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
const backImage = require('../../Assets/UI/back1.png');
const follow_clk = require('../../Assets/UI/follow_clk.png');
const visitorsIcon = require('../../Assets/UI/visitors.png');
const dislike_clk = require('../../Assets/UI/dislike_non.png');
const like_non = require('../../Assets/UI/like_non.png');


let { width, height } = Dimensions.get('window');//Double

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            likeFlag: false,
            dislikeFlag: false,
            likes: 0,
            dislikes: 0
        }
    }
    componentDidMount() {
        let item = this.props.navigation.getParam('item');
        let { likes, dislikes } = item;
        this.setState({ likes, dislikes })

    }
    _reanderBrand = (data) => {
        return (
            <Image
                source={{ uri: data }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch' />
        )
    }
    likeAction = () => {
        let item = this.props.navigation.getParam('item');
        let { likes, dislikes } = item;
        const count = parseInt(likes) + 1
        this.setState({ likeFlag: !this.state.likeFlag, dislikeFlag: false, dislikes, likes: count })
    }
    dislikeAction = () => {
        let item = this.props.navigation.getParam('item');
        let { likes, dislikes } = item;
        const count = parseInt(dislikes) + 1
        this.setState({ dislikeFlag: !this.state.dislikeFlag, likeFlag: false, likes, dislikes: count })
    }
    shareAction = () => {
        Alert.alert(
            'Warning',
            'Will you really follow this place to your friends?',
            [
               
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }
    _gotEditPlace =()=> {
        let navigate = this.props.navigation.navigate;
        let item = this.props.navigation.getParam('item');
        navigate('EditPlace',{item})
    }
    render() {
        let { likeFlag, dislikeFlag, likes, dislikes } = this.state
        let navigate = this.props.navigation.navigate;
        let item = this.props.navigation.getParam('item');
        let { title, photos, address, posted_phone_number, note, visitors } = item;

        let temp = photos.toString();
        let photoArray = temp.split(",");
        //photoArray.splice(0, 1);
        return (
            <ImageBackground
                source={backImage}
                style={styles.backgroundImage}>
                <View style={styles.navbar}>
                    <Navbar
                        title={title}
                        leftText={"Back"}
                        rightText={"Edit"}
                        leftAction={() => navigate('MainScreen')}
                        rightAction={this._gotEditPlace}
                    />
                </View>
                <View style={{ width: '100%', flex: 4, paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Swiper
                        style={{ width: width - 20, backgroundColor: 'gray' }}
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
                                source={visitorsIcon}
                                style={styles.iconImage}
                            />
                            <Text style={{ color: 'white', fontFamily: 'serif' }}>{visitors}</Text>
                        </View>
                        <View style={{ marginLeft: 100, flexDirection: 'row', justifyContent: 'space-between', width: 90 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={this.likeAction}>
                                    <Image
                                        source={like_non}
                                        style={[styles.iconImage, { tintColor: likeFlag ? 'white' : 'gray' }]}
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', paddingLeft: 3, fontFamily: 'serif' }}>{likes}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={this.dislikeAction}>
                                    <Image
                                        source={dislike_clk}
                                        style={[styles.iconImage, { paddingTop: 5, tintColor: dislikeFlag ? 'white' : 'gray' }]}
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', paddingLeft: 3, fontFamily: 'serif' }}>{dislikes}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity onPress={this.shareAction}>
                                <Image
                                    source={follow_clk}
                                    style={styles.iconImage}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.phone_input}>
                        <Text style={styles.leftTextStyle}>Address: </Text>
                        <Text style={styles.contentTextStyle}>{address}</Text>
                    </View>
                    <View style={[styles.phone_input, { flexDirection: 'row' }]}>
                        <Text style={styles.leftTextStyle}>Phone Number: </Text>
                        <Text style={{ textAlignVertical: 'center', color: '#AECE74', fontSize: 14 }}>{" " + posted_phone_number}</Text>
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
        color: 'white',
        fontFamily: 'serif'
    },
    iconImage: {
        width: 20,
        height: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
        // tintColor: 'white'
    },
    leftTextStyle: {
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        textAlignVertical: 'center',
        fontFamily: 'serif'
    },
    contentTextStyle: {
        fontSize: 14,
        paddingLeft: 5,
        textAlign: 'left',
        color: 'white',
        textAlignVertical: 'center',
        fontFamily: 'serif'
    }
});