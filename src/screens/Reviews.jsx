import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Colors } from "../helper/Colors";
import { StyleSheet } from "react-native";

const Reviews = ({ navigation, business }) => {
    const widthScreen = Dimensions.get("window").width;
    const heightScreen = Dimensions.get("window").height;
    const IOS = Platform.OS === "ios";
    const ANDROID = Platform.OS === "android";

    console.log(business);

    const business1 = {
        id: 1,
        name: "Cuatro Catorce",
        img: "https://picsum.photos/200",
        reviewsNumber: 120,
        rating: 4.4,
        points: {
            comida: 4,
            precio: 3.5,
            calidad: 4.3,
        },
    };

    const comments = [
        {
            userName: "Mateo",
            userImg: "https://picsum.photos/200",
            comment: '"Lorem ipsum dolor sit amet"',
        },
        {
            userName: "Franco",
            userImg: "https://picsum.photos/200",
            comment:
                '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet egestas dignissim. Morbi consectetur, nulla eget blandit accumsan, nulla turpis varius nunc, non hendrerit nunc dui at ligula."',
        },
        {
            userName: "Lucía",
            userImg: "https://picsum.photos/200",
            comment: '"Lorem ipsum dolor sit amet"',
        },
        {
            userName: "Guido",
            userImg: "https://picsum.photos/200",
            comment:
                '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet egestas dignissim."',
        },
    ];

    return (
        <View
            style={{
                backgroundColor: Colors.lightGray,
                height: heightScreen,
                width: widthScreen,
                paddingHorizontal: 20,
            }}
        >
            {/* Rating section */}
            <Text style={Styles.title}>Calificación de {business1.name}</Text>
            <View style={Styles.topContainer}>
                <View style={Styles.ratingContainer}>
                    <View style={Styles.numberContainer}>
                        <Text style={Styles.ratingNumber}>
                            {business1.rating}
                        </Text>
                        <Text style={Styles.ratingTotal}>/5</Text>
                    </View>
                    <Text style={Styles.ratingSubtitle}>
                        Basado en {business1.reviewsNumber} reseñas
                    </Text>
                </View>
                <View style={Styles.pointsContainer}>
                    <Text>Comida</Text>
                    <Text>Precio</Text>
                    <Text>Calidad</Text>
                </View>
                <View style={Styles.pointsContainer}>
                    <View style={Styles.pointsBarBack}>
                        <View
                            style={{
                                height: 8,
                                width: 90,
                                backgroundColor: "#717171",
                            }}
                        ></View>
                    </View>
                    <View style={Styles.pointsBarBack}>
                        <View
                            style={{
                                height: 8,
                                width: 50,
                                backgroundColor: "#717171",
                            }}
                        ></View>
                    </View>
                    <View style={Styles.pointsBarBack}>
                        <View
                            style={{
                                height: 8,
                                width: 75,
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
                    {comments.map((comment) => (
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
                                    source={{ uri: comment.userImg }}
                                />
                                <Text>{comment.userName}</Text>
                            </View>
                            <Text
                                style={{
                                    marginHorizontal: 15,
                                    marginBottom: 10,
                                }}
                            >
                                {comment.comment}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={Styles.reserveBtn}
                    onPress={() => navigation.navigate("RateRestaurant", { business })}
                >
                    <Text style={Styles.btnText}>Calificar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
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
