import React from "react";
import { Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";

const Favorites = ({ navigation }) => {
    let favorites = [
        {
            id: 1,
            name: "Cuatro catorce",
            img: "https://picsum.photos/200",
        },
        {
            id: 2,
            name: "Kräke",
            img: "https://picsum.photos/200",
        },
        {
            id: 3,
            name: "Patagonia",
            img: "https://picsum.photos/200",
        },
    ];

    return (
        <View style={Styles.mainContainer}>
            {favorites.map((business) => (
                <View style={Styles.businessContainer} key={business.id}>
                    <Image
                        style={Styles.image}
                        source={{ uri: business.img }}
                    />
                    <Text style={Styles.title}>{business.name}</Text>
                </View>
            ))}
        </View>
    );
};

const Styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        height: "100%",
    },
    businessContainer: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        margin: 10,
    },
    image: {
        height: 100,
        width: 100,
    },
    title: {
        marginStart: 10,
        fontSize: 18,
        fontWeight: "700",
        color: "#0f0e0e",
    },
});

export default Favorites;
