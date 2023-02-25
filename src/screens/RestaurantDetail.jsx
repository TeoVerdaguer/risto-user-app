import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { Dimensions } from "react-native";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RestaurantDetail = ({ route, navigation }) => {
    const widthScreen = Dimensions.get("window").width;
    const heightScreen = Dimensions.get("window").height;
    const IOS = Platform.OS === "ios";
    const businessId = route.params.id;
    const [business, setBusiness] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const today = new Date();
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(today);
    const [personsValue, setPersonsValue] = useState(1);
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    let msg = "";

    const firstRender = useRef(true);

    useEffect(() => {
        getBusinessDetail();
    }, []);

    useEffect(() => {
        if (!firstRender.current) {
            isFavorite
                ? (msg = business.name + " agreagado a favoritos")
                : (msg = business.name + " eliminado de favoritos");
            Alert.alert(msg);
        }
        firstRender.current = false;
    }, [isFavorite]);

    // TODO: GET favorites y POST favorite

    // GET business details
    const getBusinessDetail = async () => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-business-detail/?business=${businessId}`;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();

            let image = "";
            if (
                responseJson.data.resource_list.length > 0 &&
                responseJson.data.resource_list[0].resource_image
            ) {
                for (
                    let i = 0;
                    i <= responseJson.data.resource_list.length;
                    i++
                ) {
                    if (responseJson.data.resource_list[i]) {
                        images.push(
                            responseJson.data.resource_list[i].resource_image
                        );
                    }
                }
            }
            let businessData = {
                img: image,
                name: responseJson.data.business_name,
                address: responseJson.data.business_address,
                id: responseJson.data.business_id,
            };
            setImages(images);
            setBusiness(businessData);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // TODO: GET avail de mesas -
    // reservation/get-reservation-availability/?reservation_date=2023-01-17&business=1&reservation_size=4

    return (
        <View
            style={{
                height: heightScreen,
                width: widthScreen,
            }}
        >
            {/* Images container */}
            <View style={{ height: IOS ? "60%" : "55%" }}>
                {/* Loading spinner */}
                {loading && (
                    <View
                        style={{
                            height: heightScreen / 1.66,
                            width: widthScreen,
                            position: "absolute",
                            zIndex: 8,
                            top: 150,
                            left: 0,
                            marginHorizontal: "auto",
                            marginTop: "auto",
                        }}
                    >
                        <ActivityIndicator size="large" color="#424242" />
                    </View>
                )}

                {/* Images carousel */}
                <ImageCarousel
                    images={images}
                    height={IOS ? heightScreen / 1.66 : heightScreen / 1.81}
                    width={widthScreen}
                    dotColor="red"
                />
            </View>

            {/* Header icons */}
            <View
                style={{
                    position: "absolute",
                    top: IOS ? 45 : 20,
                    left: 20,
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        style={[Styles.icon, Styles.backBtn]}
                        name="chevron-back"
                        size={30}
                        color="#ffffff"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setIsFavorite(!isFavorite);
                    }}
                >
                    <Ionicons
                        style={Styles.icon}
                        name="heart"
                        size={30}
                        color={isFavorite ? "#bf3737" : "#ffffff"}
                    />
                </TouchableOpacity>
            </View>

            {/* Restaurant info */}
            <View
                style={{
                    height: "40%",
                    width: widthScreen,
                    backgroundColor: "#f0f0f0",
                    padding: 20,
                }}
            >
                <Text style={[Styles.black, Styles.title]}>
                    {business.name}
                </Text>
                <View style={Styles.subtitleContainer}>
                    <Ionicons
                        style={Styles.icon}
                        name="location-sharp"
                        size={20}
                        color="#010103"
                    />
                    <Text style={Styles.mainText}>{business.address}</Text>
                    <TouchableOpacity
                        style={Styles.ratingContainer}
                        onPress={() =>
                            navigation.navigate("Reviews", { business })
                        }
                    >
                        <Ionicons
                            style={Styles.icon}
                            name="star"
                            size={16}
                            color="#e8c33d"
                        />
                        <Text style={Styles.black}>4.4</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.line} />

                {/* Reservation modal */}
                <View style={Styles.personsContainer}>
                    <Text style={[Styles.mainText, Styles.boldText]}>
                        Cuantos somos
                    </Text>
                    <NumericInput
                        value={personsValue}
                        onChange={(value) => setPersonsValue(value)}
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
                <TouchableOpacity style={Styles.reserveBtn}>
                    <Text style={Styles.btnText}>Reservar</Text>
                </TouchableOpacity>
            </View>
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

export default RestaurantDetail;
