// Reseñas

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Colors } from "../helper/Colors";
import { StyleSheet } from "react-native";
// icons
import Ionicons from "react-native-vector-icons/Ionicons";

const Reviews = ({ navigation, route }) => {
    const widthScreen = Dimensions.get("window").width;
    const heightScreen = Dimensions.get("window").height;
    const [business, setBusiness] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setBusiness(route.params.business);
        console.log(business);
    }, []);

    useEffect(() => {
        console.log(business);
        getComments(business.id);
    }, [business]);

    // GET business comments
    const getComments = async (business_id) => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/feedback/list-comment-feedback/?business=${business_id}`;

            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
                const { data } = await response.json();
                console.log(data);
                setComments(data);
            } catch (error) {
                console.log(error);
            }
    };

    return (
        <View
            style={{
                backgroundColor: Colors.lightGray,
                height: heightScreen,
                width: widthScreen
            }}
        >
            {/* Header */}
            <View style={Styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color={'#2cb551'}
                    onPress={() => {navigation.goBack()}}
                />
                <Text style={Styles.headerTitle}>Reseñas</Text>
                <View style={{width: 30}}></View>
            </View>

            {/* Rating section */}
            {business.feedback && (
            <View style={Styles.mainContainer}>
                <Text style={Styles.title}>Calificación de {business.name}</Text>
                <View style={Styles.topContainer}>
                    <View style={Styles.ratingContainer}>
                        <View style={Styles.numberContainer}>
                            <Text style={Styles.ratingNumber}>
                                {business.rating}
                            </Text>
                            <Text style={Styles.ratingTotal}>/5</Text>
                        </View>
                        <Text style={Styles.ratingSubtitle}>
                            Basado en {business.feedback.overall_total_feedbacks} reseñas
                        </Text>
                    </View>
                    <View style={Styles.pointsContainer}>
                        <Text>Comida</Text>
                        <Text>Precio</Text>
                        <Text>Servicio</Text>
                    </View>
                    <View style={Styles.pointsContainer}>
                        <View style={Styles.pointsBarBack}>
                            <View
                                style={{
                                    height: 8,
                                    width: (business.feedback.food_average * 20),
                                    backgroundColor: "#717171",
                                }}
                            ></View>
                        </View>
                        <View style={Styles.pointsBarBack}>
                            <View
                                style={{
                                    height: 8,
                                    width: (business.feedback.price_average * 20),
                                    backgroundColor: "#717171",
                                }}
                            ></View>
                        </View>
                        <View style={Styles.pointsBarBack}>
                            <View
                                style={{
                                    height: 8,
                                    width: (business.feedback.service_average * 20),
                                    backgroundColor: "#717171",
                                }}
                            ></View>
                        </View>
                    </View>
                </View>
                {/* Comments section */}
                <View style={{ height: "47%" }}>
                    <Text style={Styles.commentsTitle}>Comentarios</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {comments && comments.length > 0 && comments.map((comment) => (
                            <View
                                key={comment.id}
                                style={{
                                    backgroundColor: "#FFF",
                                    borderRadius: 10,
                                    marginVertical: 10,
                                    minHeight: 100,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: 25,
                                            width: 25,
                                            borderRadius: 20,
                                            margin: 10,
                                        }}
                                        source={{ uri: comment.user.photo }}
                                    />
                                    <Text>{comment.user.givenName}</Text>
                                </View>
                                <Text
                                    style={{
                                        marginHorizontal: 15,
                                        marginBottom: 10,
                                    }}
                                >
                                    {comment.comment_review}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={Styles.reserveBtn}
                        onPress={() =>
                            navigation.navigate("RateRestaurant", { business: business })
                        }
                    >
                        <Text style={Styles.btnText}>Calificar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </View>
    );
};

const IOS = Platform.OS === "ios";

const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: IOS ? 100 : 60,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 15
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000'
    },
    mainContainer: {
        paddingHorizontal: 20,
        height: '95%'
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },
    title: {
        marginTop: 50,
        marginBottom: 15,
        fontWeight: "700",
        fontSize: 16,
        color: Colors.black,
    },
    ratingContainer: {
        backgroundColor: Colors.white,
        height: 150,
        width: 150,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    numberContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 5,
    },
    ratingNumber: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 30,
    },
    ratingTotal: {
        color: Colors.black,
        fontWeight: "600",
        paddingBottom: 3,
        paddingLeft: 3,
    },
    ratingSubtitle: {
        color: Colors.darkGray,
        fontSize: 12,
        fontWeight: "600",
    },
    pointsContainer: {
        justifyContent: "space-around",
    },
    pointsBarBack: {
        height: 8,
        width: 100,
        backgroundColor: "#ffffff",
    },
    commentsTitle: {
        fontWeight: "700",
        fontSize: 18,
        color: Colors.black,
    },
    reserveBtn: {
        backgroundColor: "#54a431",
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
    },
});

export default Reviews;
