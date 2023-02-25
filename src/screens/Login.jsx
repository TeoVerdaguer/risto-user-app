import React from "react";
import { View } from "react-native";
import UserLogin from "../components/UserLogin";

const Login = ({ navigation }) => {
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
