/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Navbar from '../../Components/navbar'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from "../../redux/action.js"

const backImage = require('../../Assets/UI/back1.png');
const myLocation = require('../../Assets/UI/myLocation.png');
const map_picker = require('../../Assets/UI/map_picker.png');

let { width, height } = Dimensions.get('window');//Double
const ASPECT_RATIO = width / height;
const LATITUDE = 38.78825;
const LONGITUDE =  -122.4324;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {};
class seletNewPlace extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            region: {
            },
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            loading: false,
            mapType: 'standard',
            mapRegion: {

            }
        }
    }
    getInitialState() {
        let region = this.props.navigation.getParam('region');
        // console.log("region", region)
        //this.setState({ region: region });
        //this.handleMakerPress(region)

    }
    handleMakerPress = (latitude, longitude) => {
        const initialRegion = {
            latitude, longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
        this.mapView.animateToRegion(initialRegion, 2000);
    }
    componentDidMount(): void {
        this.getInitialState();
    }
    _gotoMe = () => {

        Geolocation.getCurrentPosition(
            position => {
                this.handleMakerPress(position.coords.latitude,  position.coords.longitude,)
                //   console.log(position.coords.latitude)
                // this.setState({
                //     region: {
                //         latitude: position.coords.latitude,
                //         longitude: position.coords.longitude,
                //         latitudeDelta: 0.0922,
                //         longitudeDelta: 0.0421
                //     }
                // });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    onRegionChange = (region) => {
        this.setState({ region: region });
    }
    debounce = (fn, delay) => {
        let timeoutId;
        return function (...args) {
            clearInterval(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    };
    _gotoAdd = () => {
        let { region } = this.state;
        let navigate = this.props.navigation.navigate;
        navigate('AddPlace', { region })
    }
    onMapLayout = () => {
        let region = this.props.navigation.getParam('region');
        // console.log("region", region)
        //this.setState({ region: region });
        this._gotoMe()
        this.handleMakerPress(region.latitude, region.longitude)

      }

    render() {
        let navigate = this.props.navigation.navigate;
        let {latitude, longitude}= this.state
        return (
            <View
                style={styles.backgroundImage}>
                <View style={styles.navbar}>
                    <Navbar
                        title={"Select New Place"}
                        leftText={"Back"}
                        rightText={"Next"}
                        rightAction={this._gotoAdd}
                        leftAction={() => navigate('MainScreen')}

                    />
                </View>
                <MapView
                    ref={ref => (this.mapView = ref)}
                    initialRegion={{
                        ...this.state
                    }} 
                    provider={PROVIDER_GOOGLE}
                    style={styles.MapContainer}
                    mapType={this.state.mapType}
                    onRegionChangeComplete={this.debounce(this.onRegionChange, 1000, {
                        leading: false,
                        trailing: true
                    })}
                    onLayout={this.onMapLayout}
                //   region={this.state.region}
                // onRegionChange={this.onRegionChange}
                >
                          <Marker
                        zIndex={1000}
                        anchor={{ y: 0.75, x: 0.5 }}
                        coordinate={{
                            latitude: latitude || 37.78825,
                            longitude: longitude || -122.4324
                        }}

                    />
                    {/* <Marker draggable
                        coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
                        title={'title'}
                        description={'description'}/> */}
                </MapView>
                <View style={styles.bottomContainer}>
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.runbtn} onPress={this._gotoMe}>
                            <Image style={{ width: 40, height: 40, tintColor: '#667275' }} source={myLocation} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.centerContainer}>
                    <Image style={{ width: 40, height: 40 }} source={map_picker} />
                </View>
            </View>
        );
    }
}

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
        justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#5E5E5E',
        borderBottomColor: '#dedede',
        //borderBottomWidth: 1,
        height: 40,
        justifyContent: 'center',
        zIndex: 999
    },
    tabItemWrapper: {
        paddingBottom: 5,
        paddingTop: 10,
        width: (Dimensions.get('window').width - 16) / 4 - 2,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemText: {
        fontSize: 14,
        marginBottom: 0
    },
    scene: {
        flex: 1,
    },
    MapContainer: {
        flex: 1,
        width: width,
        height:height
    },
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
    centerContainer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: (Dimensions.get('window').height - 50) / 2,
        padding: 2,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(55,255,255,0)',
        zIndex: 999,
        width: '100%'
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
export default connect(mapStateToProps, mapDispatchToProps)(seletNewPlace);


