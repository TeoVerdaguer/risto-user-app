import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

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
            console.log(pos);
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            });
        });

        getRestaurants(6); //TODO: Get province number
    }, []);

    /**
     * @desc Gets the list of restaurants in the province
     * @param {number} province
     * @returns void
     */
    const getRestaurants = async (province) => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-business-list/?province=${province}`;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const {data} = await response.json();;

            const restaurantsList = data.map((item) => ({
                name: item.business_name,
                id: item.business_id,
                position: {
                    latitude: parseFloat(
                        item.map_position_x
                    ),
                    longitude: parseFloat(
                        item.map_position_y
                    ),
                }
            }));

            setRestaurants(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

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
                    {restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            coordinate={restaurant.position}
                            title={restaurant.name}
                        />
                    ))}
                </MapView>

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
