import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import { useState } from "react";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

const CreateReservation = ({ restaurantName, disableInput }) => {
    const widthScreen = Dimensions.get("window").width;
    const today = new Date();
    const endDate = new Date("2023-12-31");
    const [date, setDate] = useState(today);
    const [time, setTime] = useState("21:00");
    const [partySize, setpartySize] = useState(1);
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        restaurantName ? getRestaurant(restaurantName) : null;
    }, []);


    /**
     * @desc Gets list of restaurants that match the searched text
     * @param {string} text
     * @returns void
     */
    const getRestaurant = async (name) => {
        const province = 6; // TODO: get province
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-business-by-name/?province=${province}&business_name=${name}`;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const { data } = await response.json();

            const restaurant = {
                name: data[0].business_name,
                id: data[0].business_id,
                img:
                    data[0].resource_list?.resource_image ??
                    "https://picsum.photos/200",
            };

            setRestaurant(restaurant);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * @desc creates a new reservation
     * @param {number} id
     * @returns void
     */
    const reserve = async  (restaurant, date, time, partySize) => {

        const client_id = '109990122989172956878';
        const client_phone = '3513288231';
        // Format: YYYY-MM-DD
        const reservation_date = `${date.toISOString().split('T')[0]} ${time}`;
        const province = 6; // TODO: get province
        // const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-business-by-name/?province=${province}&business_name=${name}`;
        // try {
        //     const response = await fetch(URL, {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //         body: {
        //             "business":{restaurant},
        //             "reservation_size":{partySize},
        //             "client_id":{client_id},
        //             "reservation_date":{reservation_date},
        //             "reservation_phone":{client_phone},
        //             "special_reservation":false,
        //             // "special_reservation_type":"ANIVERSARIO"
        //         }
        //     });
        //     const { data } = await response.json();

        //     const restaurant = {
        //         name: data[0].business_name,
        //         id: data[0].business_id,
        //         img:
        //             data[0].resource_list?.resource_image ??
        //             "https://picsum.photos/200",
        //     };

        //     setRestaurant(restaurant);
        // } catch (error) {
        //     console.log(error);
        // }

        console.log('restaurant: ' + restaurant.name);
        console.log('restaurant id: ' + restaurant.id);
        console.log(reservation_date);
        console.log('party size: ' + partySize);
    };

    const availableTimes = [
        {
            time: "12:00",
            id: 0,
        },
        {
            time: "12:15",
            id: 1,
        },
        {
            time: "12:30",
            id: 2,
        },
        {
            time: "12:45",
            id: 3,
        },
        {
            time: "12:45",
            id: 4,
        },
        {
            time: "12:45",
            id: 5,
        },
        {
            time: "12:45",
            id: 6,
        },
        {
            time: "12:45",
            id: 7,
        },
        {
            time: "12:45",
            id: 8,
        },
    ];

    const Item = ({ time }) => (
        <TouchableOpacity
            style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={() => {
                setTime(time);
                setOpenTime(!openTime);
            }}
        >
            <Text style={{ color: "#000", fontSize: 14 }}>{time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ backgroundColor: "#F1F1F1", padding: 20 }}>
            <View style={Styles.personsContainer}>
                <Text style={[Styles.mainText, Styles.boldText]}>
                    Cuantos somos
                </Text>
                <NumericInput
                    editable={!disableInput}
                    value={partySize}
                    onChange={(value) => setpartySize(value)}
                    minValue={1}
                    totalHeight={45}
                    totalWidth={widthScreen * 0.9 * 0.25}
                    rounded
                    borderColor="transparent"
                    containerStyle={{ backgroundColor: "white" }}
                />
            </View>

            {/* Date and time picker */}
            <View style={Styles.dateContainer}>
                {/* Date picker button */}
                <TouchableOpacity
                    disabled={disableInput}
                    style={disableInput ? Styles.datePickerDisabled : Styles.datePicker}
                    onPress={() => setOpenDate(true)}
                >
                    <Text style={Styles.mainText}>
                        {date.toISOString().slice(0, 10)}
                    </Text>
                </TouchableOpacity>
                {/* Time picker button */}
                <TouchableOpacity
                    disabled={disableInput}
                    style={disableInput ? Styles.timePickerDisabled : Styles.timePicker}
                    onPress={() => setOpenTime(true)}
                >
                    <Text style={Styles.mainText}>{time}</Text>
                </TouchableOpacity>
            </View>

            {/* Date picker modal */}
            <DatePicker
                modal
                open={openDate}
                date={date}
                mode="date"
                minimumDate={today}
                maximumDate={endDate}
                onConfirm={(date) => {
                    setDate(date);
                }}
                onCancel={() => {
                }}
            />

            {/* Time picker modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={openTime}
                presentationStyle={"overFullScreen"}
                onRequestClose={() => {
                    setOpenTime(false);
                }}
            >
                <View
                    style={{
                        borderRadius: 10,
                        width: "55%",
                        margin: 100,
                        backgroundColor: "#FFF",
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 10,
                            flexDirection: "row",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                            Seleccionar hora
                        </Text>
                        <TouchableOpacity onPress={() => setOpenTime(false)}>
                            <Ionicons
                                style={[Styles.icon]}
                                name="close"
                                size={30}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                    {availableTimes.length > 0 && (
                        <FlatList
                            data={availableTimes}
                            renderItem={({ item }) => <Item time={item.time} />}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </Modal>

            <TouchableOpacity
                disabled={disableInput}
                style={ disableInput ? Styles.reserveBtnDisabled : Styles.reserveBtn}
                onPress={() => reserve(restaurant, date, time, partySize)}
            >
                <Text style={Styles.btnText}>Reservar</Text>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    black: {
        color: "#010103",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        alignSelf: "flex-start",
        marginTop: 10,
    },
    mainText: {
        fontSize: 16,
        color: "#010103",
    },
    boldText: {
        fontWeight: "700",
    },
    line: {
        borderBottomColor: "#e5e5e8",
        borderBottomWidth: 1.5,
        width: "100%",
    },
    ratingContainer: {
        marginStart: "auto",
        flexDirection: "row",
    },
    icon: {
        marginRight: 8,
    },
    backBtn: {
        color: "#54a431",
    },
    personsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    subtitleContainer: {
        flexDirection: "row",
        paddingVertical: 20,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    datePicker: {
        backgroundColor: "#ffffff",
        height: 45,
        width: "70%",
        borderRadius: 7,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 15,
        marginEnd: "3%",
    },
    datePickerDisabled: {
        backgroundColor: "#ffffff",
        height: 45,
        width: "70%",
        borderRadius: 7,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 15,
        marginEnd: "3%",
    },
    timePicker: {
        backgroundColor: "#ffffff",
        height: 45,
        width: "25%",
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    timePickerDisabled: {
        backgroundColor: "#ffffff",
        height: 45,
        width: "25%",
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    reserveBtn: {
        backgroundColor: "#54a431",
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    reserveBtnDisabled: {
        backgroundColor: "#D4D5DB",
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },  
    btnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
    },
});

export default CreateReservation;
