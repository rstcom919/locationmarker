import React, { Component } from "react"
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    FlatList
} from "react-native"
import axios from 'axios'
import { connect } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';//`${ADMIN_ENDPOINT}register`
import { Marker } from 'react-native-maps';
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
const myLocation = require('../../Assets/UI/myLocation.png');


const setting = require('../../Assets/UI/setting.png');
const logout = require('../../Assets/UI/logout.png');
const map_nor = require('../../Assets/UI/map_nor.png');
const map_sat = require('../../Assets/UI/map_sat.jpg');

const search_ico = require('../../Assets/UI/search_ico.png');
let { width, height } = Dimensions.get('window');//Double

class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
            },
            loading: false,
            mapType: 'standard',
            modalState: false,
            searchStr: '',
            searchPlaces: [],
            mapRegion: {

            }
        }
    }

    getInitialState() {
        let latitude = 40.78825, longitude = -122.4324;
        let mapRegion = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.421,
        };
        this.setState({ mapRegion: mapRegion, region: mapRegion });
    }

    componentDidMount(): void {
        this.requestLocationPermission();
        this.getInitialState();

    }
    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    switchMapType = () => {
        this.setState({ mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
    }
    confirmLocation = () => {
        this.setState({ loading: true });
        let region = this.state.region;
        let coords = {
            latitude: region.latitude,
            longitude: region.longitude
        }


    }

    static navigationOptions = {
        header: null
    };

    onRegionChange = (region) => {
        this.setState({ mapRegion: region });
        console.log(region)
    }
    _gotoMe = () => {

        Geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude)
                this.setState({
                    mapRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    _gotoDetail = (item) => {
        console.log("item--", item)
        this.setState({ modalState: false })
        let navigate = this.props.navigation.navigate;
        navigate('DetailPlace', { item })
    }
    _search = () => {
        let { searchStr } = this.state;
        this.setState({ modalState: true, loading: true })
        const data = { "title_or_address_keyword": searchStr }
        axios.post('http://placetracker.net/RestAPIs/searchPlaceRequest', data)
            .then(res => {
                console.log(res.data.status)
                if (res.data.status) {
                    this.setState({ searchPlaces: res.data.places, loading: false })
                }
                else {
                    this.setState({ loading: false })
                    console.log("error")
                }
            })
    }
    debounce = (fn, delay) => {
        let timeoutId;
        return function (...args) {
            clearInterval(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    };
   async logout(){
        await AsyncStorage.removeItem("logedin")
        let navigate = this.props.navigation.navigate;
        navigate('Welcome')
    }
    render() {
        let navigate = this.props.navigation.navigate;
        let { region, mapRegion } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={styles.MapContainer}
                    showsUserLocation={true}
                    region={this.state.region}
                    // onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.debounce(this.onRegionChange, 1000, {
                        leading: false,
                        trailing: true
                    })}
                    mapType={this.state.mapType}

                >
                    {/* <Marker draggable
                        coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
                        title={'title'}
                        description={'description'}
                    /> */}
                </MapView>
                <View style={styles.bottomContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.runbtn} onPress={()=> this.logout()}>
                            <Image style={{ width: 35, height: 35, tintColor: '#667275' }} source={logout} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.runbtn} onPress={() => this.props.navigation.navigate('SettingScreen')}>
                            <Image style={{ width: 35, height: 35, tintColor: '#667275     ' }} source={setting} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.runbtn} onPress={this.switchMapType}>
                            <Image style={{ width: 40, height: 40 }} source={this.state.mapType !== "standard" ? map_nor : map_sat} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.runbtn} onPress={this._gotoMe}>
                            <Image style={{ width: 40, height: 40, tintColor: '#667275' }} source={myLocation} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.topContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1 }}>
                        <Image style={{ width: 25, height: 25 }} source={search_ico} />
                    </View>
                    <View style={{borderRadius:2, alignItems: 'center', justifyContent: 'center', height: 34, flex: 7, margin: 3, backgroundColor: 'white' }}>
                        <TextInput
                            returnKeyType="next"
                            autoFocus={false}
                            underlineColorAndroid="transparent"
                            placeholder={""}
                            placeholderTextColor="gray"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ searchStr: text })}
                            value={this.state.searchStr}
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
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 1, borderColor: '#3DA9DA', borderWidth: 1, height: '100%', marginHorizontal: 2 }}
                            onPress={this._search}>
                            <Text style={{ color: 'white' }}>
                                {"Search"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 3, flex: 1, borderColor: '#3DA9DA', borderWidth: 1, height: '100%', marginHorizontal: 2 }}
                            onPress={() => navigate("SelectNewPlaceScreen", { region })}>
                            <Text style={{ color: 'white' }}>
                                {"New"}
                            </Text>
                        </TouchableOpacity>
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
                                marginTop: 55,
                                flexDirection: 'column',
                                width: width - 26, height: height - 130,
                                //borderRadius: 10,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: 'gray',
                                padding: 5
                            }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.searchPlaces}
                                    horizontal={false}
                                    numColumns={1}
                                    renderItem={({ item, index }) => {
                                        return <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.6}
                                            onPress={() => this._gotoDetail(item)}>
                                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, width: '100%' }}>
                                                <Text style={{ color: 'white', fontSize: 14, fontWeight: '500', marginTop: 14, width: width - 26, }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={{ color: 'white', fontSize: 12, fontWeight: '500', marginTop: 2, width: width - 26,}}>
                                                    {item.address}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }}
                                    keyExtractor={(index) => index.toString()}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                <OrientationLoadingOverlay
                    visible={this.state.loading}
                    color="white"
                    indicatorSize="large"
                    messageFontSize={12}
                    message="Loading..."
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        padding: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'rgba(55,255,255,0)',
        zIndex: 999,
        width: '100%'
    },
    topContainer: {
        position: 'absolute',
        backgroundColor: '#686868',
        zIndex: 999,
        justifyContent: 'center',
        width: width - 20,
        height: 40,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        top: 0,
        flexDirection: 'row'
    },
    runbtn: {
        backgroundColor: '#EDF9FD',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 45,
        borderRadius: 15,
        margin: 5
    },
    MapContainer: {
        flex: 1,
        width: '100%',
    },
    confirm_button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"g"
    },
    button_text: {
        color: 'white',
        fontSize: 18,
        padding: 10
    }

});





export default MapScreen;