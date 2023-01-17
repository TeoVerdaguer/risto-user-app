import React, { Component } from 'react'
import { View, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const Map = ({ navigation }) => {

    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });


      useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        });
      }, []);
    
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
          provider={PROVIDER_GOOGLE}
          style={Styles.map}
          initialRegion={position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
           <Marker
           title='Yor are here'
           description='This is your current location'
           coordinate={position}/>
           </MapView>
            {/* <MapView
                style={Styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                // region={this.getMapRegion()}
            /> */}
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
