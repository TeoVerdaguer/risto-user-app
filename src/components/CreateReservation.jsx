import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { StyleSheet } from "react-native";

function CreateReservation() {
    const [searchText, setSearchText] = useState("");

    const renderContent = () => (
        <View
            style={{
                backgroundColor: "white",
                padding: 16,
                height: 450,
            }}
        >
            {/* Search TextInput */}
            <TextInput
                style={{
                    height: 40,
                    margin: 16,
                    backgroundColor: "#e1e1e1",
                    padding: 10,
                }}
                placeholder="Buscar restaurantes"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
            />
            <View style={{ height: 300 }}>
                {/* Personas */}
                <View style={Styles.personasContainer}>
                    <Text>Cuantos somos</Text>
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={() => {}}
                        value="0"
                        style={{
                            borderColor: "#000",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 5,
                            marginStart: 50,
                        }}
                    />
                </View>

                {/* Fecha reserva */}
                <View style={Styles.fechaContainer}>
                    <Button title="reservar hoy"></Button>
                    <Button title="22:00"></Button>
                </View>
            </View>
            <Button title="Reservar" />
        </View>
    );

    const sheetRef = React.useRef(null);

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    title="Open Bottom Sheet"
                    onPress={() => sheetRef.current.snapTo(0)}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
        </>
    );
}

const Styles = StyleSheet.create({
    personasContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    fechaContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default CreateReservation;
