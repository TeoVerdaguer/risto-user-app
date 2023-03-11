import React, {useState, useEffect} from "react";
import { Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UserLogin from "../components/UserLogin";
// Encrypted storage
import EncryptedStorage from "react-native-encrypted-storage";

const Favorites = ({ navigation }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Get user token
    const retrieveUserToken = async () => {
        try {
            const token = await EncryptedStorage.getItem("user_token");

            if (token) {
                console.log(token);
                setIsLoggedIn(true);
                console.log("user is logged in");
            } else {
                console.log("token is undefined");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        retrieveUserToken();
    }, []);

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
            {isLoggedIn ? (
                favorites.map((business) => (
                    <View style={Styles.businessContainer} key={business.id}>
                        <Image
                            style={Styles.image}
                            source={{ uri: business.img }}
                        />
                        <Text style={Styles.title}>{business.name}</Text>
                    </View>
                ))
            ) : (
                <UserLogin />
            )}
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
