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
    TouchableWithoutFeedback,
    PermissionsAndroid,
    FlatList,
    Alert,
    Modal,
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../../../redux/action.js"
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import styles from './styles'
const logoImage = require('../../../../Assets/UI/mark1.png');
const backImage = require('../../../../Assets/UI/back1.png');
const mailIcon = require('../../../../Assets/UI/email_ico.png');
const passwordIcon = require('../../../../Assets/UI/password.png');
const photo_non = require('../../../../Assets/UI/photo_non.png');
const profileIcon = require('../../../../Assets/UI/profile.png');
const phoneIcon = require('../../../../Assets/UI/phone.png');
const addFriend = require('../../../../Assets/UI/add_friend.png');
const search_ico = require('../../../../Assets/UI/search_ico.png');
let { width, height } = Dimensions.get('window');//Double

const screenHeight = Dimensions.get('window').height;


class Signup extends Component {
    state = {
        logoMarginAnim: new Animated.Value(screenHeight / 4),
        spinnerOpacityAnim: new Animated.Value(1),
        contentMarginAnim: new Animated.Value(30),
        contentOpacityAnim: new Animated.Value(0),
        uploadURL: null,
        searchFlag: false,
        name_keyword: "",
        users: [],
        loading: false,
        modalState: false
    }
    _search = () => {
        let { name_keyword } = this.state
        const data = { name_keyword }
        this.setState({ modalState: true, loading: true })
        axios.post('http://placetracker.net/RestAPIs/friendSearchRequest', data)
            .then(res => {

                if (res.data.status) {
                    //  console.log("users------", res.data.users)
                    this.setState({ users: res.data.users, loading: false })
                }
                else {
                    this.setState({ loading: false })
                    console.log("error")
                }
            })

    }
    _addFriend = (item) => {
        this.setState({ loading: true })
        let { id } = this.props.UserInfo;
        const data = { user_id: id, friend_id: item.id }
        axios.post('http://placetracker.net/RestAPIs/friendAddRequest', data)
            .then(res => {
                this.setState({ loading: false })
                if (res.data.status) {
                    console.log("data------", res.data)
                }
            })
    }
    customerAlert = (item) => {
        this.setState({ modalState: false, name_keyword: "" })
        Alert.alert(
            'Warning',
            "Will you really add Name to your friend List",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this._addFriend(item) },
            ],
            { cancelable: false },
        );
    }
    render() {
        let { searchFlag } = this.state
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
                            flexDirection: 'row'
                        }}
                        onPress={() => this.setState({ searchFlag: true })}
                    >
                        <Image
                            source={addFriend}
                            style={styles.iconImage}
                        />
                        <Text style={{ color: '#97B16C', fontSize: 16 }}>
                            {" Add Friend"}
                        </Text>
                    </TouchableOpacity>
                    {searchFlag && <View style={styles.topContainer}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1 }}>
                            <Image style={{ width: 25, height: 25, tintColor: 'white' }} source={search_ico} />
                        </View>
                        <View style={{ borderRadius: 2, alignItems: 'center', justifyContent: 'center', height: 34, flex: 7, margin: 3, backgroundColor: 'white' }}>
                            <TextInput
                                returnKeyType="next"
                                autoFocus={false}
                                underlineColorAndroid="transparent"
                                placeholder={"Search Name"}
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                onChangeText={text => this.setState({ name_keyword: text })}
                                value={this.state.name_keyword}
                                style={{
                                    paddingTop: 10,
                                    fontSize: 16,
                                    width: '100%',
                                    // backgroundColor: 'red',
                                    textAlignVertical: 'bottom',
                                    height: 50
                                }}>
                            </TextInput>
                        </View>
                        <View style={{ padding: 5, alignItems: 'center', justifyContent: 'center', height: '100%', flex: 4, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 1, borderColor: 'white', borderWidth: 1, height: '100%', marginHorizontal: 2 }}
                                onPress={this._search}>
                                <Text style={{ color: 'white' }}>
                                    {"Search"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 1, borderColor: 'white', borderWidth: 1, height: '100%', marginHorizontal: 2 }}
                                onPress={() => this.setState({ searchFlag: false })}>
                                <Text style={{ color: 'white' }}>
                                    {"Cancel"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    <View style={{
                        flexDirection: 'column',
                        width: width - 50, height: height - 300,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5
                    }}>
                        <FlatList
                            extraData={this.props}
                            data={this.props.friends}
                            horizontal={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.6}
                                    onPress={() => this.customerAlert(item)}>
                                    <View style={{ marginVertical: 4, borderBottomColor: 'white', borderBottomWidth: 0, width: '100%', flexDirection: "row" }}>

                                        <Image
                                            source={{ uri: item.photo }}
                                            style={{ marginTop: 0, width: 50, height: 50, borderRadius: 25 }}
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', marginTop: 2, width: width - 26, }}>
                                                {item.first_name + " " + item.last_name}
                                            </Text>
                                            <Text style={{ color: 'white', fontSize: 12, fontWeight: '500', marginTop: 2, width: width - 26, }}>
                                                ({item.email})
                                                </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }}
                            keyExtractor={(index) => index.toString()}
                        />
                    </View>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.modalState}
                    onRequestClose={() => {
                        this.setState({ modalState: false });
                    }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        //  backgroundColor: 'rgba(0,0,0,0.6)',

                    }} onPressOut={() => { this.setState({ modalState: false }) }}>
                        <TouchableWithoutFeedback>
                            <View style={{
                                marginTop: 180,
                                flexDirection: 'column',
                                width: width - 50, height: height - 300,
                                //borderRadius: 10,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: 'gray',
                                padding: 5
                            }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.users}
                                    horizontal={false}
                                    numColumns={1}
                                    renderItem={({ item, index }) => {
                                        return <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.6}
                                            onPress={() => this.customerAlert(item)}>
                                            <View style={{ marginVertical: 4, borderBottomColor: 'white', borderBottomWidth: 0, width: '100%', flexDirection: "row" }}>

                                                <Image
                                                    source={{ uri: item.photo }}
                                                    style={{ marginTop: 0, width: 50, height: 50, borderRadius: 25 }}
                                                />
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', marginTop: 2, width: width - 26, }}>
                                                        {item.first_name + " " + item.last_name}
                                                    </Text>
                                                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '500', marginTop: 2, width: width - 26, }}>
                                                        ({item.email})
                                                </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }}
                                    keyExtractor={(index) => index.toString()}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                <ScrollView style={styles.container}>
                    <View
                        style={{
                            marginTop: 40
                        }}
                    >
                    </View>
                </ScrollView>
                <OrientationLoadingOverlay
                    visible={this.state.loading}
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
        UserInfo: auth.user,
        loading: auth.loading,
        friends: auth.friends,

    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);



