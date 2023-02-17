import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

function Reservations() {
    return (
        <View style={Styles.mainContainer}>
            <Text style={Styles.title}>Proximas Reservas</Text>
            <View style={Styles.cardContainer}>
                <Image
                    style={Styles.cardImg}
                    source={{ uri: "https://picsum.photos/200" }}
                />
                <View style={Styles.cardContent}>
                    <Text style={Styles.cardTitle}>Cuatro Catorce</Text>
                    <Text style={Styles.cardSubtitle}>21:00</Text>
                    <Text style={Styles.cardTimer}>Faltan 2 horas</Text>
                </View>
            </View>
            <Text style={Styles.title}>Reservas Anteriores</Text>
        </View>
    );
}

const Styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    title: {
        marginVertical: 10,
        fontWeight: "700",
        fontSize: 18,
        alignSelf: "flex-start",
    },
    cardContainer: {
        width: "100%",
        height: 120,
        backgroundColor: "#FFF",
        flexDirection: "row",
    },
    cardTitle: {
        fontWeight: "700",
        fontSize: 18,
        margin: 10,
    },
    cardImg: {
        height: "80%",
        width: "30%",
        margin: 10,
    },
    cardContent: {
        width: "63%",
        justifyContent: "space-between",
        paddingBottom: 10,
    },
    cardSubtitle: {
        marginHorizontal: 10,
        fontWeight: "400",
        fontSize: 16,
    },
    cardTimer: {
        marginHorizontal: 10,
        fontWeight: "600",
        fontSize: 16,
        alignSelf: "flex-end",
    },
});

export default Reservations;
