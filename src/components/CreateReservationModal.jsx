import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Button, Text } from "@rneui/base";
import Modal from "react-native-modal";
// icons
import Ionicons from "react-native-vector-icons/Ionicons";
// create reservation component
import CreateReservation from "./CreateReservation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 * @desc Returns restaurants which match the searched text
 * @param {string} text
 * @returns void
 */
const CreateReservationModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [restaurantName, setRestaurantName] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [disableInput, setDisableInput] = useState(true);

    useEffect(() => {
        setRestaurantsList([]);
    }, []);

    useEffect(() => {
        console.log(restaurantsList);
    }, [restaurantsList]);

    /**
     * @desc Gets list of restaurants that match the searched text
     * @param {string} text
     * @returns void
     */
    const searchRestaurant = async (text) => {
        const province = 6; // TODO: get province
        text = text.toLowerCase();
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-business-by-name/?province=${province}&business_name=${text}`;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const { data } = await response.json();

            const restaurantsList = data.map((item) => ({
                name: item.business_name,
                id: item.business_id,
                img:
                    item.resource_list?.resource_image ??
                    "https://picsum.photos/200",
            }));

            setRestaurantsList(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * @desc Resets the searched text and the restaurants list
     * @returns void
     */
    const resetSearchText = () => {
        setSearchText("");
        setRestaurantsList([]);
        setRestaurantName(null);
        setDisableInput(true);
    };

    /**
     * @desc Sets the selected restaurant to make reservation
     * @param {number} id
     * @returns void
     */
    const setSelectedRestaurant = (name) => {
        setRestaurantName(name);
        setSearchText(name);
    };

    const Item = ({ name, img, id }) => (
        <TouchableOpacity
            style={Styles.flatListItem}
            onPress={() => {
                setSelectedRestaurant(name);
                setDisableInput(false);
            }}
        >
            <Image style={Styles.listItemImg} source={{ uri: img }} />
            <Text style={Styles.listItemName}>{name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{}}>
            <KeyboardAwareScrollView
                style={Styles.container}
                extraHeight={120}
                enableOnAndroid={true}
            >
                <Button
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    buttonStyle={Styles.buttonStyle}
                    icon={
                        <Ionicons name={"add-sharp"} size={22} color={"#FFF"} />
                    }
                />
                <Modal
                    backdropOpacity={0.3}
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={Styles.contentView}
                >
                    {/* Modal content */}
                    <View style={Styles.content}>
                        {/* Search TextInput */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                marginHorizontal: 20,
                                marginTop: 20,
                                marginBottom: 0,
                                maxHeight: 42,
                                borderRadius: 10,
                            }}
                        >
                            <Ionicons
                                style={{ padding: 10 }}
                                name="search-outline"
                                size={20}
                                color="#000"
                            />
                            <TextInput
                                // style={Styles.textInput}
                                style={{
                                    flex: 1,
                                    paddingTop: 10,
                                    paddingRight: 10,
                                    paddingBottom: 10,
                                    paddingLeft: 0,
                                    backgroundColor: "#fff",
                                    color: "#424242",
                                }}
                                placeholder="Buscar restaurantes"
                                placeholderTextColor="#000"
                                onChangeText={(text) => setSearchText(text)}
                                onSubmitEditing={() =>
                                    searchRestaurant(searchText)
                                }
                                value={searchText}
                            />
                            <Ionicons
                                style={{ padding: 10 }}
                                name="close"
                                size={20}
                                color="#000"
                                onPress={() => {
                                    resetSearchText();
                                }}
                            />
                        </View>

                        {restaurantsList.length > 0 && !restaurantName && (
                            <FlatList
                                style={Styles.flatList}
                                data={restaurantsList}
                                renderItem={({ item }) => (
                                    <Item
                                        name={item.name}
                                        img={item.img}
                                        id={item.id}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                            />
                        )}

                        {searchText.length == 0 || restaurantName ? (
                            <CreateReservation
                                restaurantName={restaurantName}
                                disableInput={disableInput}
                            />
                        ) : null}
                    </View>
                </Modal>
            </KeyboardAwareScrollView>
        </View>
    );
};

const IOS = Platform.OS === "ios";

const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: "auto",
        width: 40,
    },
    contentView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    content: {
        backgroundColor: "#F1F1F1",
        height: IOS ? "35%" : "40%",
        alignItems: "center",
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    buttonStyle: {
        height: 40,
        width: 40,
        backgroundColor: "#54A432",
        borderRadius: 100,
        marginVertical: 5,
        padding: 0,
    },
    flatList: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 10,
        marginTop: 10,
    },
    flatListItem: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        margin: 10,
    },
    listItemImg: {
        height: "100%",
        width: "15%",
    },
    listItemName: {
        color: "#000",
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 15,
    },
});

export default CreateReservationModal;
