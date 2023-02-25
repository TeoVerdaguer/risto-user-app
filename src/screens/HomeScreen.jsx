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
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        console.log("////// reloaded ////////");
        // GET provincia (ubicacion usuario)
        getProvince();
        // GET categorias
        getCategories();

        // GET listado de restaurantes
        getRestaurants(province);
    }, []);

    useEffect(() => {
        filterByCategory(selectedCategory);
    }, [selectedCategory]);

    /**
     * @desc Gets the current province
     * @returns void
     */
    const getProvince = async () => {
        // TODO: obtener provincia en base a la ubicacion del usuario
        setProvince(6);
    };

    /**
     * @desc Gets the list of all used categories
     * @returns void
     */
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

    /**
     * @desc Gets the list of restaurants in the province
     * @param {number} province
     * @returns void
     */
    const getRestaurants = async (province) => {
        const URL =
            `https://risto-api-dev.dexterdevelopment.io/business/get-business-list/?province=${province}`;
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

    /**
     * @desc Returns restaurants which have the searched tags
     * @param {string} text
     * @returns void
     */
    const getSearchBusiness = async (text) => {
        const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-search-business/?tag_search=${text.toLowerCase()}&province=6`;

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

    /**
     * @desc Returns restaurants which have the category received
     * @param {number} categ
     * @returns Array
     */
    const filterByCategory = async (categ) => {
        setSearchText("");
        if (categ) {
            const URL = `https://risto-api-dev.dexterdevelopment.io/business/get-search-business/?category_id=${categ}&province=6`;

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
                        image =
                            responseJson.data[i].resource_list.resource_image;
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
        } else {
            getRestaurants(province);
        }
    };

    // const filteredRestaurants = restaurants.filter(
    //     (restaurant) =>
    //         !selectedCategory || restaurant.category === selectedCategory
    // );

    return (
        <View style={Styles.mainContainer}>
            {/* Search TextInput */}
            <TextInput
                style={Styles.textInput}
                placeholder="Buscar restaurantes"
                placeholderTextColor="#000"
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={() => getSearchBusiness(searchText)}
                value={searchText}
            />

            {/* Categories Filters */}
            <View style={Styles.categFilterContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.restaurantsContainer}
                >
                    {categories.map((category) => (
                        <Chip
                            style={Styles.restaurantCard}
                            key={category.id}
                            selected={category.id === selectedCategory}
                            onPress={() =>
                                selectedCategory === category.id
                                    ? setSelectedCategory(null)
                                    : setSelectedCategory(category.id)
                            }
                        >
                            {category.name}
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            {/* Reservas Dispoibles */}
            <Text style={Styles.reservasText}>Reservas disponibles</Text>

            {restaurants && restaurants.length > 0 ? (
                <BusinessCard
                    navigation={navigation}
                    province={province}
                    restaurants={restaurants}
                    isLoggedIn={isLoggedIn}
                />
            ) : null}
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
    mainContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    textInput: {
        height: 40,
        margin: 16,
        backgroundColor: "#e1e1e1",
        padding: 10,
    },
    categFilterContainer: {
        height: 70,
    },
    restaurantsContainer: {
        margin: 10,
        flex: 1,
        marginEnd: 0,
    },
    restaurantCard: {
        margin: 3,
        backgroundColor: "#e1e1e1",
        height: 40,
    },
    reservasText: {
        fontSize: 20,
        margin: 10,
        fontWeight: "700",
        color: "#202025",
    },
});

export default HomeScreen;
