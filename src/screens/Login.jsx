import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UserLogin from "../components/UserLogin";
// Encrypted storage
import EncryptedStorage from "react-native-encrypted-storage";

const Login = ({ navigation }) => {

    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        retrieveUserToken();
    }, [userToken]);

    /**
     * @desc Gets user token from encrypted storage
     * @returns void
     */
    const retrieveUserToken = async () => {
        try {
            const token = await EncryptedStorage.getItem("user_token");

            if (token) {
                setUserToken(token);
                console.log("user is logged in");
            } else {
                console.log("token is undefined");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const LoggedInModal = () => {
        return (
            <View>
                <Text>Ya iniciaste sesion</Text>
            </View>
        );
    };

    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            {userToken ? (<LoggedInModal />) : (<UserLogin />
            )}
        </View>
    );
};

export default Login;
