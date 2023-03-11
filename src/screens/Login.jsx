import React from "react";
import { View } from "react-native";
import UserLogin from "../components/UserLogin";
// Encrypted storage
import EncryptedStorage from "react-native-encrypted-storage";

const Login = ({ navigation }) => {

    // Save user token in Encrypted storage
    const storeUserToken = async (token) => {
        try {
            await EncryptedStorage.setItem("user_token", token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <UserLogin />
        </View>
    );
};

export default Login;
