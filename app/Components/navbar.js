import React, { Component } from 'react';
import {
    Animated,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
class Navbar extends Component {
    render() {
        const { title, leftText, rightText, rightAction, leftAction } = this.props;

        return (
            <View style={{ zIndex: 999, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: 80, justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingTop: 2 }}
                        onPress={leftAction}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 14, textAlign: 'center',
                            textAlignVertical: 'center',
                            fontFamily: 'serif'
                        }}>{leftText}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{
                        fontWeight: '700',
                        fontFamily: '',
                        color: 'white',
                        fontSize: 18, textAlign: 'center',
                        textAlignVertical: 'center',
                        fontFamily: 'serif'
                    }}>{title}</Text>
                </View>
                <View style={{ width: 80, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingTop: 2 }}
                        onPress={rightAction}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 14, textAlign: 'center',
                            textAlignVertical: 'center',
                            fontFamily: 'serif'
                        }}>{rightText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}




export default Navbar;