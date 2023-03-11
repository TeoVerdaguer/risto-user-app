import React, { useState } from "react";
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { List } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const SpecialRequests = ({
    showSpecialRequestsModal,
    setShowSpecialRequestsModal,
    setShowThankYouMsg,
    restaurant,
    date,
    time,
    partySize,
    specialOcation,
    specialOcationType,
}) => {
    const [value, onChangeText] = useState("");
    const [isSpecialOcation, setIsSpecialOcation] = useState(false);
    const [selectedOcation, setSelectedOcation] = useState("Cumpleaños");
    const [expanded, setExpanded] = useState(false);
    /**
     * @desc creates a new reservation
     * @param {number} id
     * @returns void
     */
    const reserve = async (
        restaurant,
        date,
        time,
        partySize,
        specialOcation,
        specialOcationType
    ) => {
        const clientId = "109990122989172956878";
        const clientPhone = "3513288231";
        // Date format: YYYY-MM-DD
        const reservationDate = `${date.toISOString().split("T")[0]} ${time}`;
        const URL = `https://risto-api-dev.dexterdevelopment.io/reservation/post-reservation/`;

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    business: restaurant.id,
                    reservation_size: partySize,
                    client_id: clientId,
                    reservation_date: reservationDate,
                    reservation_phone: clientPhone,
                    special_reservation: specialOcation,
                    special_reservation_type: specialOcationType,
                }),
            });
            const responseJSON = await response.json();
            const data = responseJSON.data;
            if (responseJSON.error) {
                console.log("error en la reserva");
                console.log(responseJSON.message);
            } else {
                console.log("reserva completada");
                setShowSpecialRequestsModal(false);
                setShowThankYouMsg(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showSpecialRequestsModal}
            presentationStyle={"overFullScreen"}
            onRequestClose={() => {
                setShowSpecialRequestsModal(false);
            }}
        >
            <View style={Styles.container}>
                <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setShowSpecialRequestsModal(false)}>
                    <Ionicons
                        style={{ padding: 10, alignSelf: 'flex-end' }}
                        name="close"
                        size={30}
                        color="#000"
                        onPress={() => {
                            setShowSpecialRequestsModal(false);
                        }}
                    />
                </TouchableOpacity>
                </View>

                <Text style={Styles.text}>¿Es una ocasión especial?</Text>
                <View style={Styles.btnContainer}>
                    <TouchableOpacity
                        style={
                            isSpecialOcation ? Styles.btnSelected : Styles.btn
                        }
                        onPress={() => setIsSpecialOcation(true)}
                    >
                        <Text
                            style={
                                isSpecialOcation
                                    ? Styles.btnTextSelected
                                    : Styles.btnText
                            }
                        >
                            Si
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            isSpecialOcation ? Styles.btn : Styles.btnSelected
                        }
                        onPress={() => setIsSpecialOcation(false)}
                    >
                        <Text
                            style={
                                isSpecialOcation
                                    ? Styles.btnText
                                    : Styles.btnTextSelected
                            }
                        >
                            No
                        </Text>
                    </TouchableOpacity>
                </View>

                {isSpecialOcation && (
                    <List.Section style={{ width: "90%" }}>
                        <List.Accordion style={{ backgroundColor: '#fff'}} titleStyle={{color: '#000'}} title={selectedOcation} expanded={expanded} onPress={() => setExpanded(!expanded)}>
                            <List.Item
                                title="Cumpleaños"
                                onPress={() => 
                                    {setSelectedOcation("Cumpleaños"); setExpanded(false);}
                            }
                            />
                            <List.Item
                                title="Aniversario"
                                onPress={() =>
                                    {setSelectedOcation("Aniversario"); setExpanded(false);}
                                }
                            />
                            <List.Item
                                title="Negocios"
                                onPress={() => 
                                    {setSelectedOcation("Negocios"); setExpanded(false);}
                                }
                            />
                        </List.Accordion>
                    </List.Section>
                )}

                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    placeholder="comentarios"
                    style={Styles.textInput}
                />
                <TouchableOpacity
                    style={Styles.continueBtn}
                    onPress={() =>
                        reserve(
                            restaurant,
                            date,
                            time,
                            partySize,
                            isSpecialOcation,
                            selectedOcation
                        )
                    }
                >
                    <Text style={Styles.continueBtnText}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30%",
        paddingBottom: 20,
        borderRadius: 10,
        shadowColor: "#262626",
        shadowOffset: 50,
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "500",
    },
    btnContainer: {
        flexDirection: "row",
        margin: 20,
    },
    btn: {
        borderColor: "#151515",
        borderWidth: 2,
        borderRadius: 10,
        height: 40,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    btnSelected: {
        borderColor: "#151515",
        backgroundColor: "#151515",
        borderWidth: 2,
        borderRadius: 10,
        height: 40,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "500",
    },
    btnTextSelected: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    textInput: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        height: 200,
        width: "90%",
        fontSize: 16,
        marginTop: 10,
    },
    continueBtn: {
        backgroundColor: "#54a431",
        borderRadius: 5,
        height: 50,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    continueBtnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
    },
});

export default SpecialRequests;
