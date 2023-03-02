import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { useState } from "react";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateReservation = ({ navigation, restaurantName }) => {
    const today = new Date();
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(today);
    const [partySize, setpartySize] = useState(1);
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        getRestaurant(restaurantName);
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
    const reserve = (restaurant, date, time, partySize) => {
        console.log(restaurant);
        console.log(date);
        console.log(time);
        console.log(partySize);
    };

    return (
        <View style={{backgroundColor: '#F1F1F1', padding: 20}}>
            <View style={Styles.personsContainer}>
                <Text style={[Styles.mainText, Styles.boldText]}>
                    Cuantos somos
                </Text>
                <NumericInput
                    value={partySize}
                    onChange={(value) => setpartySize(value)}
                    minValue={1}
                    totalHeight={45}
                    totalWidth={110}
                />
            </View>
            {/* Date picker */}
            <View style={Styles.dateContainer}>
                <TouchableOpacity
                    style={Styles.datePicker}
                    onPress={() => setOpenDate(true)}
                >
                    <Text style={Styles.mainText}>
                        {date.toISOString().slice(0, 10)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.timePicker}
                    onPress={() => setOpenTime(true)}
                >
                    <Text style={Styles.mainText}>
                        {date.toTimeString().slice(0, 5)}
                    </Text>
                </TouchableOpacity>

                <DatePicker
                    modal
                    open={openDate}
                    date={date}
                    mode="date"
                    minimumDate={today}
                    onConfirm={(date) => {
                        setOpenDate(false);
                        setDate(date);
                    }}
                    onCancel={() => {
                        setOpenDate(false);
                    }}
                />
                <DatePicker
                    modal
                    open={openTime}
                    date={date}
                    mode="time"
                    minuteInterval={15}
                    onConfirm={(date) => {
                        setOpenTime(false);
                        setTime(date);
                    }}
                    onCancel={() => {
                        setOpenTime(false);
                    }}
                />
            </View>
            <TouchableOpacity style={Styles.reserveBtn} onPress={() => reserve(restaurant, date, time, partySize )}>
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
        marginRight: 8
    },
    backBtn: {
        color: "#54a431",
    },
    personsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "space-between",
    },
    subtitleContainer: {
        flexDirection: "row",
        paddingVertical: 20,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
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
    timePicker: {
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
        justifyContent: "center",
    },
    btnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
    },
});

export default CreateReservation;
