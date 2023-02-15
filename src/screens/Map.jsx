import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const IOS = Platform.OS === "ios";
const ANDROID = Platform.OS === "android";

const Map = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [position, setPosition] = useState({
        latitude: 100,
        longitude: 100,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
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
            console.log(position);
        });

        // GET listado de restaurantes
        getRestaurants();
    }, []);

    // GET restaurants list
    const getRestaurants = async () => {
        const province = 6; //TODO: Get province number
        const URL =
            "https://risto-api-dev.dexterdevelopment.io/business/get-business-list/?province=" +
            province;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();
            let restaurantsList = [];
            console.log(responseJson.data);
            for (let i = 0; i < responseJson.data.length; i++) {
                restaurantsList.push({
                    name: responseJson.data[i].business_name,
                    id: responseJson.data[i].business_id,
                    position: {
                        latitude: parseFloat(responseJson.data[i].map_position_y),
                        longitude: parseFloat(responseJson.data[i].map_position_x),
                    },
                    // positionX: responseJson.data[i].map_position_x,
                    // positionY: responseJson.data[i].map_position_y
                });
            }
            setRestaurants(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };
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
                    rotateEnabled={true}
                >
                    {/* <Marker
                        title="Yor are here"
                        description="This is your current location"
                        coordinate={position}
                    /> */}
                    {restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            coordinate={restaurant.position}
                            title={restaurant.name}
                        />
                    ))}
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
                    <TouchableOpacity
                        style={Styles.mainBtn}
                        onPress={() => {
                            navigation.navigate("Explorar");
                        }}
                    >
                        <Text style={Styles.btnText}>Ver restaurantes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    map: {
        width: "100%",
        height: "90%",
    },
    btnContainer: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    mainBtn: {
        backgroundColor: "#54a431",
        height: "70%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 18,
    },
});

export default Map;
