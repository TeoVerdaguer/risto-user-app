import React, { Component } from 'react'
import { View, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet } from 'react-native'

const Map = ({ navigation }) => {

    // const LATITUDE_DELTA = 0.009;
    // const LONGITUDE_DELTA = 0.009;
    // const LATITUDE = 18.7934829;
    // const LONGITUDE = 98.9867401;

    // state = {
    //     latitude: LATITUDE,
    //     longitude: LONGITUDE,
    //     error: null
    // }

    // getMapRegion = () => ({
    //     latitude: this.state.latitude,
    //     longitude: this.state.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA
    // });


    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //         console.log(position);
    //         this.setState({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         error: null
    //         });
    //     },
    //     error => this.setState({ error: error.message }),
    //         { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    //     );
    // } else {
    //     console.log('no navigator-------')
    // }
    
    
  return (
    <View>
        <View style={Styles.container}>
            <MapView
                style={Styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                // region={this.getMapRegion()}
            />
            <View style={Styles.btnContainer}>
                <Button
                    title={'Ver Restaurantes'}
                    color={'#22C676'}
                />
            </View>
        </View>
    </View>
    
  )
}

const Styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%'
    },
    map: {
        width: '100%',
        height: '90%'
    },
    btnContainer: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default Map
