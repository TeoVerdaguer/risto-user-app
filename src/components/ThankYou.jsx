import React from "react";
import { View, Image, Text, Modal, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../helper/Colors";

const ThankYou = ({ showThankYouMsg, setShowThankYouMsg, restaurantName, restaurantImg, partySize, date, time, setModalVisible }) => {

    const goToHome = () => {
        setShowThankYouMsg(false);
        setModalVisible ? setModalVisible(false) : null;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showThankYouMsg}
            onRequestClose={() => {
                setShowThankYouMsg(false);
            }}
        >
            <View style={Styles.container}>
                <View style={Styles.topContainer}>
                    <Image style={Styles.image} source={{ uri: restaurantImg }} />
                    <Text style={Styles.title}>¡Gracias por tu reserva!</Text>
                    <Text style={Styles.text}>Podrás ver el detalle en "Mis reservas".</Text>
                </View>

                <View style={Styles.infoContainer}>
                    <View style={Styles.column}>
                        <Text style={Styles.textLeft}>Lugar</Text>
                        <Text style={Styles.textLeft}>Personas</Text>
                        <Text style={Styles.textLeft}>Día</Text>
                        <Text style={Styles.textLeft}>Hora</Text>
                    </View>
                    <View style={Styles.column}>
                            <Text style={Styles.textRight}>{restaurantName}</Text>
                            <Text style={Styles.textRight}>{partySize}</Text>
                            <Text style={Styles.textRight}>{date.toISOString().slice(0, 10)}</Text>
                            <Text style={Styles.textRight}>{time}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={Styles.button}
                    onPress={() => goToHome()}
                >
                    <Text style={Styles.btnText}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const Styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        height: '100%'
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200,
        margin: 20
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.black,
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        color: Colors.black,
        marginTop: 10,
    },
    infoContainer: {
        marginVertical: 30,
        width: '70%',
        flexDirection: 'row'
    },
    column: {
        width: '50%',
    },
    textLeft: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.black,
        marginVertical: 20
    },
    textRight: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 20,
        textAlign: 'right'
    },
    button: {
        backgroundColor: Colors.black,
        height: 45,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700'
    }
});

export default ThankYou;
