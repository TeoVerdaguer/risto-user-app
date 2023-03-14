// Calificar experiencia

import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Icons
import Ionicons from "react-native-vector-icons/Ionicons";
import StarsRating from "../components/StarsRating";

const RateRestaurant = ({ navigation, route }) => {
    const [business, setBusiness] = useState({});
    const [overallScore, setOverallScore] = useState(0);
    const [foodScore, setFoodScore] = useState(0);
    const [priceScore, setPriceScore] = useState(0);
    const [serviceScore, setServiceScore] = useState(0);

    useEffect(() => {
        setBusiness(route.params.business);
        console.log(business);
    }, [business]);

    // POST feedback
    const postFeedback = async () => {
        const URL = 'https://risto-api-dev.dexterdevelopment.io/feedback/post-new-feedback/';

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "business":1,
                    "reservation_id":15,
                    "client_id":"109990122989172956878",
                    "overall_stars":1,
                    "food_stars" : 1,
                    "service_stars": 1,
                    "price_stars": 1
                }),
            });
            const responseJSON = await response.json();
            if (responseJSON.error) {
                console.log(responseJSON.message);
            } else {
                console.log(responseJSON);
                console.log('feedback enviado!!!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showScores = () => {
        console.log('food: ' + foodScore);
        console.log('price: ' + priceScore);
        console.log('service: ' + serviceScore);
        console.log('overall: ' + overallScore);
    };

    return (
        <View>
            {/* Header */}
            <View style={Styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color={"#2cb551"}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={Styles.headerTitle}>Calificar experiencia</Text>
                <View style={{ width: 30 }}></View>
            </View>
            {/* Main container */}
            <View style={Styles.mainContainer}>
                <View style={Styles.restaurantInfoContainer}>
                    <Image
                        style={Styles.img}
                        source={{uri: business.logo}}
                    />
                    <Text style={Styles.businessName}>{business.name}</Text>
                    <Text style={Styles.text}>Califica tu experiencia</Text>
                </View>
                {/* Stars Rating */}
                <StarsRating heading={"Comida"} setScore={setFoodScore} />
                <StarsRating heading={"Precio"} setScore={setPriceScore} />
                <StarsRating heading={"Servicio"} setScore={setServiceScore} />
                <StarsRating heading={"General"} setScore={setOverallScore} />
                {/* Continue button */}
                <TouchableOpacity style={Styles.btn} onPress={() => showScores()}>
                    <Text style={Styles.btnText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const IOS = Platform.OS === "ios";

const Styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        height: IOS ? 100 : 60,
        backgroundColor: "#fff",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
    },
    mainContainer: {
        paddingTop: 30,
        alignItems: "center",
        height: "90%",
    },
    restaurantInfoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    img: {
        height: 100,
        width: 100,
        marginBottom: 15
    },
    businessName: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    text: {
        color: '#000',
        fontSize: 16
    },
    btn: {
        backgroundColor: "#54a431",
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        width: '90%',
        position: 'absolute',
        bottom: IOS ? 60 : 0
    },
    btnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
    },
});

export default RateRestaurant;
