import React from "react";
import { View } from "react-native";
import Reviews from "../screens/Reviews";
import ThankYou from "./ThankYou";

const CreateReservation = ({ navigation }) => {
    return (
        <View>
            {/* <ThankYou image='https://picsum.photos/200' text='¡Gracias por tu reserva!' /> */}
            <Reviews />
        </View>
    );
};

export default CreateReservation;
