import React, { useState, useEffect } from "react";
import { Image, ScrollView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UserLogin from "../components/UserLogin";
// Encrypted storage
import EncryptedStorage from "react-native-encrypted-storage";
// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Favorites = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        retrieveUserToken();
        getFavorites();
    }, [userToken]);

    /**
     * @desc Gets user token from encrypted storage
     * @returns void
     */
    const retrieveUserToken = async () => {
        try {
            const token = await EncryptedStorage.getItem("user_token");

            if (token) {
                setIsLoggedIn(true);
                setUserToken(token);
            } else {
                console.log("[Favorites.jsx] token is missing");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getFavorites = async () => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/list-favorite-business/?client=${userToken}`;

        if (userToken) {
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
                const responseJSON = await response.json();
                const data = responseJSON.data;
                let favsList = [];
                if (responseJSON.error) {
                    console.log(responseJSON.message);
                } else {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        favsList.push({
                            id: data[i].business_id,
                            name: data[i].business_name,
                            img: data[i].resource_list.resource_image,
                        });
                    }
                    setFavorites(favsList);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color={"#2cb551"}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={Styles.headerTitle}>Favoritos</Text>
                <View style={{ width: 30 }}></View>
            </View>

            <ScrollView style={Styles.scrollViewContainer}>
                {isLoggedIn ? (
                    favorites.map((business) => (
                        <TouchableOpacity
                            style={Styles.businessContainer}
                            key={business.id}
                            onPress={() => {
                                navigation.navigate("RestaurantDetail", {
                                    id: business.id,
                                });
                            }}
                        >
                            <Image
                                style={Styles.image}
                                source={{ uri: business.img }}
                            />
                            <Text style={Styles.title}>{business.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <UserLogin />
                )}
            </ScrollView>
        </View>
    );
};

const IOS = Platform.OS === "ios";

const Styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        height: "100%",
    },
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
    scrollViewContainer: {
        width: "100%",
    },
    businessContainer: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        marginHorizontal: 19,
        marginVertical: 10,
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
