import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Button,
    Text,
    View,
    ScrollView,
    TextInput,
    FlatList,
} from "react-native";
import { Chip, Appbar, Card, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

const Home = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        console.log("/////////////");
        // GET categories
        getCategories();

        // GET restaurants
        getRestaurants();
    }, []);

    const getCategories = async () => {
        const URL =
            "https://api-ibook-dev.herokuapp.com/business/get-categories/";

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
            "https://api-ibook-dev.herokuapp.com/business/get-business-list/?province=6&user_id=d90f0b537aff11edb36a548aaed1f418";

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

            for (let i = 0; i < responseJson.data.length; i++) {
                restaurantsList.push({
                    name: responseJson.data[i].business_name,
                    id: responseJson.data[i].business_id,
                });
            }
            setRestaurants(restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredRestaurants = restaurants.filter(
        (restaurant) =>
            !selectedCategory || restaurant.category === selectedCategory
    );

    const BOTTOM_APPBAR_HEIGHT = 80;
    const MEDIUM_FAB_HEIGHT = 56;

    const { bottom } = useSafeAreaInsets();

    return (
        <NavigationContainer>
            <View style={{ flex: 1, height: "100%", width: "100%" }}>
                {/* Header */}
                <Appbar.Header elevated style={{ backgroundColor: "#e1e1e1" }}>
                    {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
                    <View style={Styles.headerBar}>
                        <Appbar.Content
                            titleStyle={Styles.headerSubtitle}
                            title="Buscar en"
                        />
                        <Appbar.Content
                            titleStyle={Styles.headerTitle}
                            title="Ubicacion Actual"
                            onPress={() => {
                                navigation.navigate("Map");
                            }}
                        />
                    </View>
                    <Appbar.Action
                        icon="heart"
                        onPress={() => addToFavorites()}
                    />
                </Appbar.Header>

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

                {/* Categories Filters */}
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        margin: 8,
                    }}
                >
                    {categories.map((category) => (
                        <Chip
                            style={{ margin: 3, backgroundColor: "#e1e1e1" }}
                            key={category.id}
                            selected={category.id === selectedCategory}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </Chip>
                    ))}
                </View>

                {/* Text Reservas Dispoibles */}
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

                {/* Cards */}
                <View style={Styles.cardsContainer}>
                    {restaurants.map((restaurant) => (
                        <Card style={Styles.card}>
                            <Card.Cover
                                source={{ uri: "https://picsum.photos/200" }}
                            />
                            <Card.Title
                                key={restaurant.id}
                                title={restaurant.name}
                                subtitle="21:00"
                            />
                        </Card>
                    ))}
                    {/* <Card style={Styles.card}>
            <Card.Cover source={{uri: 'https://picsum.photos/200'}} />
            <Card.Title title="Cuatro catorce" subtitle="21:00" />
            </Card>
            <Card style={Styles.card}>
            <Card.Cover source={{uri: 'https://picsum.photos/200'}} />
            <Card.Title title="Standard 69" subtitle="19:00" />
            </Card>
            <Card style={Styles.card}>
            <Card.Cover source={{uri: 'https://picsum.photos/200'}} />
            <Card.Title title="Bodegon" subtitle="22:00" />
            </Card> */}
                </View>

                {/* Bottom Bar */}
                <Appbar
                    style={[
                        Styles.bottom,
                        {
                            height: BOTTOM_APPBAR_HEIGHT + bottom,
                        },
                    ]}
                    safeAreaInsets={{ bottom }}
                >
                    <Appbar.Action icon="magnify" onPress={() => {}} />
                    <Appbar.Action icon="map" onPress={() => {}} />
                    <FAB
                        mode="flat"
                        size="medium"
                        icon="plus-circle"
                        onPress={() => {}}
                        style={[
                            Styles.fab,
                            {
                                top:
                                    (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) /
                                    2,
                            },
                        ]}
                    />
                    <Appbar.Action icon="calendar" onPress={() => {}} />
                    <Appbar.Action icon="account" onPress={() => {}} />
                </Appbar>
            </View>
        </NavigationContainer>

        // <SafeAreaView>
        //     <View style={Styles.btnContainer}>
        //         <Button
        //             color={'#22C676'}
        //             title="Go to map"
        //             onPress={() =>
        //                 navigation.navigate('Map')
        //             }
        //         />
        //     </View>
        //     <View style={Styles.btnContainer}>
        //         <Button
        //             color='#22C676'
        //             title='Go to Login'
        //             onPress={() =>
        //                 navigation.navigate('Login')
        //             }
        //         />
        //     </View>
        //     <View style={Styles.btnContainer}>
        //         <Button
        //             color='#22C676'
        //             title='Go to Restaurants List'
        //             onPress={() =>
        //                 navigation.navigate('RestaurantsList')
        //             }
        //         />
        //     </View>
        // </SafeAreaView>
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

export default Home;
