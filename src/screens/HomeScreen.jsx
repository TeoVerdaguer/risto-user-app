import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import BusinessCard from "../components/BusinessCard";
import Api from "../helper/Api";

const HomeScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [province, setProvince] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        console.log("////// reloaded ////////");
        // GET provincia (ubicacion usuario)
        getProvince();
        // GET categorias
        getCategories();

        // GET listado de restaurantes
        getRestaurants();
    }, []);

    useEffect(() => {
        console.log('hola');
        console.log(filteredRestaurants);
    }, [filteredRestaurants]);

    // filtrar restaurantes por text input
    // useEffect(() => {
    //     if (restaurants && restaurants[0]) {
    //         const filteredRestaurants = restaurants.filter((restaurant) =>
    //             restaurant.tags.includes(searchText)
    //         );
    //         console.log(filteredRestaurants);
    //     }
    // }, [searchText]);

    const getProvince = async () => {
        // TODO: obtener provincia en base a la ubicacion del usuario
        setProvince(6);
    };

    const getCategories = async () => {
        const URL =
            "https://risto-api-dev.dexterdevelopment.io/business/get-categories/";
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();

            let categoriesList = [];
            for (let i = 0; i < responseJson.data.length; i++) {
                categoriesList.push({
                    name: responseJson.data[i].business_category_name,
                    id: responseJson.data[i].business_category_id,
                });
            }
            setCategories(categoriesList);
        } catch (error) {
            console.log(error);
        }
    };

    const getRestaurants = async () => {
        const URL =
            "https://risto-api-dev.dexterdevelopment.io/business/get-business-list/?province=" +
            province;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();
            let restaurantsList = [];
            let image = "";

            for (let i = 0; i < responseJson.data.length; i++) {
                if (
                    responseJson.data[i] &&
                    responseJson.data[i].resource_list.resource_image
                ) {
                    image = responseJson.data[i].resource_list.resource_image;
                } else {
                    image = "https://picsum.photos/200";
                }

                restaurantsList.push({
                    name: responseJson.data[i].business_name,
                    id: responseJson.data[i].business_id,
                    img: image,
                    tags: responseJson.data[i].business_tags,
                });
            }
            setFilteredRestaurants(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

    /**
    * @desc Returns restaurants which have the searched tags
    * @param {string} text
    * @returns void
    */
    const getSearchBusiness = async (text) => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-search-business/?tag_search=${text}&province=6`;

        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();
            
            let restaurantsList = [];
            let image = "";

            for (let i = 0; i < responseJson.data.length; i++) {
                if (
                    responseJson.data[i] &&
                    responseJson.data[i].resource_list.resource_image
                ) {
                    image = responseJson.data[i].resource_list.resource_image;
                } else {
                    image = "https://picsum.photos/200";
                }

                restaurantsList.push({
                    name: responseJson.data[i].business_name,
                    id: responseJson.data[i].business_id,
                    img: image,
                    tags: responseJson.data[i].business_tags,
                });
            }
            setRestaurants(restaurantsList);

        } catch (error) {
            console.log(error);
        }
    };

    // const filteredRestaurants = restaurants.filter(
    //     (restaurant) =>
    //         !selectedCategory || restaurant.category === selectedCategory
    // );

    return (
        <View style={{ flex: 1, height: "100%", width: "100%" }}>
            {/* Search TextInput */}
            <TextInput
                style={{
                    height: 40,
                    margin: 16,
                    backgroundColor: "#e1e1e1",
                    padding: 10,
                }}
                placeholder="Buscar restaurantes"
                placeholderTextColor="#000"
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={() => getSearchBusiness(searchText)}
                value={searchText}
            />

            {/* Categories Filters */}
            <View style={{ height: 70 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ margin: 10, flex: 1, marginEnd: 0 }}
                >
                    {categories.map((category) => (
                        <Chip
                            style={{
                                margin: 3,
                                backgroundColor: "#e1e1e1",
                                height: 40,
                            }}
                            key={category.id}
                            selected={category.id === selectedCategory}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            {/* Reservas Dispoibles */}
            <Text
                style={{
                    fontSize: 20,
                    margin: 10,
                    fontWeight: "700",
                    color: "#202025",
                }}
            >
                Reservas disponibles
            </Text>

            <BusinessCard navigation={navigation} province={province} />

            {/* Reservas anteriores */}
            {/* <Text
                style={{
                    fontSize: 20,
                    margin: 10,
                    fontWeight: "700",
                    color: "#202025",
                }}
            >
                Reservas anteriores
            </Text>
            <BusinessCard
                navigation={navigation}
                province={province}
            /> */}
        </View>
    );
};

const Styles = StyleSheet.create({
    btnContainer: {
        margin: 10,
    },
    headerBar: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    headerTitle: {
        textDecorationLine: "underline",
        fontWeight: "600",
    },
    headerSubtitle: {
        fontSize: 15,
    },
    cardsContainer: {
        flexDirection: "row",
    },
    card: {
        height: 270,
        width: 150,
        margin: 10,
    },
    bottom: {
        backgroundColor: "#e1e1e1",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "space-around",
        alignItems: "center",
    },
    fab: {
        backgroundColor: "#999999",
        borderRadius: 40,
    },
});

export default HomeScreen;
