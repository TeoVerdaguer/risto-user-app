import React from "react";
import { View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

const BusinessCard = ({ navigation, province }) => {
    const [restaurants, setRestaurants] = useState([]);

    const Business = {
        name: "",
    };

    useEffect(() => {
        // GET business details
        getBusinessDetail();
    }, []);

    const getBusinessDetail = async () => {
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
            console.log(responseJson);
            let restaurantsList = [];
            let image = '';

            for (let i = 0; i < responseJson.data.length; i++) {
                if (responseJson.data[i] && responseJson.data[i].resource_list.resource_image) {
                    image = responseJson.data[i].resource_list.resource_image;
                } else {
                    image = 'https://picsum.photos/200';
                }

                restaurantsList.push({
                    name: responseJson.data[i].business_name,
                    id: responseJson.data[i].business_id,
                    img: image
                });
            }
            setRestaurants(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.cardsContainer}>
            {restaurants.map((restaurant) => (
                <Card
                    key={restaurant.id}
                    style={Styles.card}
                    onPress={() => {
                        navigation.navigate('RestaurantDetail', { id: restaurant.id });
                    }}
                >
                    <Card.Cover source={{ uri: restaurant.img }} />
                    <Card.Title title={restaurant.name} subtitle="21:00" />
                </Card>
            ))}
        </ScrollView>

        // <Card
        //     key={1}
        //     style={Styles.card}
        //     onPress={() => {navigation.navigate('RestaurantDetail')}}>
        //     <Card.Cover source={{businessImage}} />
        //     <Card.Title title={businessName} subtitle="21:00" />
        // </Card>
    );
};

const Styles = StyleSheet.create({
    card: {
        height: 270,
        width: 150,
        margin: 10,
    },
    cardsContainer: {
        flexDirection: "row",
    },
});

export default BusinessCard;
