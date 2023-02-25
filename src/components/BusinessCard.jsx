import React from "react";
import { ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

const BusinessCard = ({ navigation, province, restaurants, isLoggedIn }) => {
    return (
        <ScrollView
            horizontal={isLoggedIn}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={
                isLoggedIn ? Styles.cardsContainerHor : Styles.cardsContainerVer
            }
        >
            {restaurants.map((restaurant) => (
                <Card
                    key={restaurant.id}
                    style={Styles.card}
                    onPress={() => {
                        navigation.navigate("RestaurantDetail", {
                            id: restaurant.id,
                        });
                    }}
                >
                    <Card.Cover source={{ uri: restaurant.img }} />
                    <Card.Title title={restaurant.name} subtitle="21:00" />
                </Card>
            ))}
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    cardsContainerHor: {
        flexDirection: "row",
    },
    cardsContainerVer: {
        flex: 1,
    },
    card: {
        height: 270,
        width: 150,
        margin: 10,
    },
});

export default BusinessCard;
