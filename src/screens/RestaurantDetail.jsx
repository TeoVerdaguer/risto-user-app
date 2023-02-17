import * as React from "react";
import {
    Image,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { Dimensions } from "react-native";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function RestaurantDetail({ route }) {
    const businessId = route.params.id;
    const [business, setBusiness] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const widthScreen = Dimensions.get("window").width;
    const heightScreen = Dimensions.get("window").height;

    useEffect(() => {
        getBusinessDetail();
    }, []);

    const getBusinessDetail = async () => {
        const URL =
            "https://risto-api-dev.dexterdevelopment.io/business/get-business-detail/?business=" +
            businessId;
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

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
                height: heightScreen,
                width: widthScreen,
            }}
        >
            {/* <ImageCarousel
                images={images}
                height={250}
                width={widthScreen}
            /> */}

            {loading && (
                <View
                    style={{ flexDirection: "row", padding: 10, height: 300 }}
                >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <View style={{ height: "50%" }}>
                <ScrollView horizontal={true}>
                    {images.map((img) => (
                        <Image
                            // key={Math.floor(Math.random() * 100) + 1}
                            style={{ width: widthScreen }}
                            source={{ uri: img }}
                        />
                    ))}
                </ScrollView>
            </View>

            <View
                style={{
                    height: "50%",
                    width: widthScreen,
                    backgroundColor: "#f0f0f0",
                    padding: 20,
                }}
            >
                <Text style={[Styles.black, Styles.title]}>
                    {business.name}
                </Text>
                <View style={Styles.subtitleContainer}>
                    <Ionicons style={Styles.icon} name="location-sharp" size={20} color="#010103" />
                    <Text style={Styles.mainText}>{business.address}</Text>
                    <View style={Styles.ratingContainer}>
                        <Ionicons style={Styles.icon} name="star" size={16} color="#e8c33d" />
                        <Text style={Styles.black}>4.4</Text>
                    </View>
                </View>
                <View style={Styles.line} />
                <View style={Styles.personsContainer}>
                    <Text style={[Styles.mainText, Styles.boldText]}>
                        Cuantos somos
                    </Text>
                    <NumericInput
                        value={1}
                        onChange={(value) => console.log(value)}
                        minValue={1}
                        totalHeight={45}
                        totalWidth={110}
                    />
                </View>
                <View style={Styles.dateContainer}>
                    <TouchableOpacity style={Styles.datePicker}>
                        <Text style={Styles.mainText}>Reservar hoy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.timePicker}>
                        <Text style={Styles.mainText}>21:00</Text>
                    </TouchableOpacity>
                    {/* <DatePicker date={date} mode='date' />
                    <DatePicker date={date} mode='time' /> */}
                </View>
                <TouchableOpacity style={Styles.reserveBtn}>
                    <Text style={Styles.btnText}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
        flexDirection: 'row'
    },
    icon: {
        marginRight: 8
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
