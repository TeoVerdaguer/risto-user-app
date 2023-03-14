import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import { useState } from "react";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";
import ThankYou from "./ThankYou";
import SpecialRequests from "./SpecialRequests";

const CreateReservation = ({
    restaurantName,
    disableInput,
    setDisableInput,
    setModalVisible,
}) => {
    const widthScreen = Dimensions.get("window").width;
    const today = new Date();
    const endDate = new Date("2023-12-31");
    const [date, setDate] = useState(today);
    const [time, setTime] = useState("21:00");
    const [partySize, setpartySize] = useState(1);
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [availableTimes, setAvailableTimes] = useState({});
    const [restaurantImg, setRestaurantImg] = useState({});
    const [showThankYouMsg, setShowThankYouMsg] = useState(false);
    const [showSpecialRequestsModal, setShowSpecialRequestsModal] = useState(false);

    useEffect(() => {
        getRestaurant(restaurantName);
    }, []);

    useEffect(() => {
        if (restaurant.name) {
            getRestaurant(restaurantName);
        }
    }, [restaurant]);

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
            setRestaurantImg(restaurant.img);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * @desc Gets list of available times in a business with the date and party size passed
     * @param {number} restaurantId
     * @param {string} date
     * @param {number} partySize
     * @returns void
     */
    const getAvailableTimes = async (restaurantId, date, partySize) => {
        // Date format: YYYY-MM-DD
        const formattedDate = `${date.toISOString().split("T")[0]}`;
        const URL = `https://risto-api-dev.dexterdevelopment.io/reservation/get-reservation-availability/?reservation_date=${formattedDate}&business=${restaurantId}&reservation_size=${partySize}`;
        // console.log(URL);
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJSON = await response.json();
            responseJSON.error
                ? console.log(responseJSON.message)
                : null;
            const data = responseJSON.data;
            setAvailableTimes(data);
        } catch (error) {
            console.log(error);
        }

    };

    /**
     * @desc gets available times and shows time select modal
     * @returns void
     */
    const openTimeModal = () => {
        getAvailableTimes(restaurant.id, date, partySize);
        setOpenTime(true);
    };

    // Item to be rendered in the available times list
    const Item = ({ time }) => (
        <TouchableOpacity
            style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={() => {
                console.log('pressed');
                console.log(time);
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
                    style={
                        disableInput
                            ? Styles.datePickerDisabled
                            : Styles.datePicker
                    }
                    onPress={() => setOpenDate(!openDate)}
                >
                    <Text style={Styles.mainText}>
                        {date.toISOString().slice(0, 10)}
                    </Text>
                </TouchableOpacity>
                {/* Time picker button */}
                <TouchableOpacity
                    disabled={disableInput}
                    style={
                        disableInput
                            ? Styles.timePickerDisabled
                            : Styles.timePicker
                    }
                    onPress={() => openTimeModal()}
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
                    // setOpenDate(false);
                }}
                onCancel={() => {
                    // setOpenDate(false);
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
                        maxHeight: "50%",
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
                    {availableTimes?.length > 0 && (
                        <FlatList
                            data={availableTimes}
                            renderItem={({ item }) => (
                                <Item time={item.time.substr(11, 5)} />
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </Modal>

            <TouchableOpacity
                disabled={disableInput}
                style={
                    disableInput ? Styles.reserveBtnDisabled : Styles.reserveBtn
                }
                onPress={() => setShowSpecialRequestsModal(true)}
            >
                <Text style={Styles.btnText}>Reservar</Text>
            </TouchableOpacity>

            {/* Special requests screen */}
            <SpecialRequests
                showSpecialRequestsModal={showSpecialRequestsModal}
                setShowSpecialRequestsModal={setShowSpecialRequestsModal}
                setShowThankYouMsg={setShowThankYouMsg}
                restaurant={restaurant}
                date={date}
                time={time}
                partySize={partySize}
            />
            {/* Thank you screen */}
            <ThankYou
                showThankYouMsg={showThankYouMsg}
                setShowThankYouMsg={setShowThankYouMsg}
                restaurantName={restaurantName}
                restaurantImg={restaurantImg}
                partySize={partySize}
                date={date}
                time={time}
                setModalVisible={setModalVisible}
            />
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
        justifyContent: "center",
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
