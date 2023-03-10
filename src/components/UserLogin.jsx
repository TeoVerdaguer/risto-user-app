import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { Colors } from "../helper/Colors";

const UserLogin = ({ navigation }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "691382666996-6r7mk2ptmbjflo0cv46sijsmq4odkikr.apps.googleusercontent.com",
            iosClientId:
                "691382666996-6cpemhsvqi180aadu2l8cp26ckm5rvkv.apps.googleusercontent.com",
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        isSignedIn();
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("due____", userInfo);
            setUser(userInfo);
            console.log(userInfo.user);
            createUser(userInfo.user);
        } catch (error) {
            console.log("Message____", error.message);
            console.log("Message____", error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("User cancelled the login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Signing in...");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Play services not available");
            } else {
                console.log("Unknown error");
            }
        }
    };

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo();
        } else {
            console.log("Please login");
        }
    };

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log("edit___", user);
            setUser(userInfo);
            console.log(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log("User has not signed in yet");
            } else {
                console.log("something went wrong.");
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
        } catch (error) {
            console.log(error.code);
        }
    };

    const createUser = async (userInfo) => {
        try {
            const response = await fetch(
                "https://api-ibook-dev.herokuapp.com/usuarios/crear-cliente/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        givenName: userInfo.givenName,
                        familyName: userInfo.familyName,
                        name: userInfo.name,
                        email: userInfo.email,
                        client_id: userInfo.id,
                        photo: userInfo.photo,
                    }),
                }
            );
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Ingresa a tu cuenta</Text>
            {!user.idToken ? (
                <GoogleSigninButton
                    style={Styles.googleSignInBtn}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            ) : (
                <TouchableOpacity onPress={signOut} style={Styles.signOutBtn}>
                    <Text>Signout</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 60,
        color: Colors.black,
    },
    signOutBtn: {
        backgroundColor: "#22C676",
        color: "#000000",
        width: 120,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    googleSignInBtn: {
        width: 192,
        height: 48,
    },
});

export default UserLogin;
