import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, AsyncStorageStatic } from "react-native";
// screens
import HomeScreen from "../screens/HomeScreen";
import Map from "../screens/Map";
import Reservations from "../screens/Reservations";
import Login from "../screens/Login";
import Favorites from "../screens/Favorites";
import Reviews from "../screens/Reviews";
import RateRestaurant from "../screens/RateRestaurant";
import RestaurantDetail from "../screens/RestaurantDetail";
// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// components
import CreateReservation from "../components/CreateReservation";
import CreateReservationModal from "../components/CreateReservationModal";
// icons
import Ionicons from "react-native-vector-icons/Ionicons";
// Encrypted storage
import EncryptedStorage from "react-native-encrypted-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

    if (routeName == "RestaurantDetail") {
        return "none";
    }
    return "flex";
};

// Define if HomeScreen header should be displayed
const getHeaderVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

    if (
        routeName == "RestaurantDetail" ||
        routeName == "Favorites" ||
        routeName == "Reviews" ||
        routeName == "RateRestaurant"
    ) {
        return false;
    }
    return true;
};

const HomeStack = ({ route: { params } }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RestaurantDetail"
                component={RestaurantDetail}
                initialParams={params}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Favorites" component={Favorites} initialParams={params} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="RateRestaurant" component={RateRestaurant} />
        </Stack.Navigator>
    );
};

const BottomTab = ({}) => {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        retrieveUserToken();
    }, []);

    // Get user token
    const retrieveUserToken = async () => {
        try {
            const token = await EncryptedStorage.getItem("user_token");

            if (token) {
                console.log(token);
                setIsLoggedIn(true);
                console.log('user is logged in');
            } else {
                console.log('token is undefined');
            }
        } catch (error) {
            console.log(error);
        }
    };

    function HomeScreenHeader() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                }}
            >
                <View style={{ width: "33%" }}></View>
                <View style={{ width: "33%", alignItems: "center" }}>
                    <Text style={Styles.headerSubtitle}>Buscar en</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="location-sharp"
                            size={20}
                            color="grey"
                        />
                        <Text
                            style={Styles.headerTitle}
                            onPress={() => {
                                navigation.navigate("Mapa");
                            }}
                        >
                            Ubicacion actual
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: "33%",
                        justifyContent: "flex-end",
                        paddingTop: 20,
                    }}
                >
                    <Ionicons
                        name="heart"
                        size={30}
                        color="grey"
                        style={{ right: 0, position: "absolute" }}
                        onPress={() => {
                            navigation.navigate("Favorites", { params: { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn } });
                            // navigation.navigate("Favorites");
                        }}
                    />
                </View>
            </View>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Explorar") {
                        iconName = focused
                            ? "ios-search"
                            : "ios-search-outline";
                    } else if (route.name === "Mapa") {
                        iconName = focused ? "ios-map" : "ios-map-outline";
                    } else if (route.name === "Nueva") {
                        iconName = focused
                            ? "ios-add-circle"
                            : "ios-add-circle-outline";
                    } else if (route.name === "Reservas") {
                        iconName = focused
                            ? "ios-calendar"
                            : "ios-calendar-outline";
                    } else if (route.name === "Usuario") {
                        iconName = focused
                            ? "ios-person-circle"
                            : "ios-person-circle-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "#54a431",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen
                name="Explorar"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarStyle: {
                        display: getTabBarVisibility(route),
                    },
                    headerShown: getHeaderVisibility(route),
                    headerTitle: (props) => <HomeScreenHeader {...props} />,
                })}
            />
            <Tab.Screen
                name="Mapa"
                component={Map}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Nueva"
                component={CreateReservation}
                options={{
                    tabBarButton: () => <CreateReservationModal />,
                }}
            />
            <Tab.Screen name="Reservas" component={Reservations} />
            <Tab.Screen name="Usuario" component={Login} />
        </Tab.Navigator>
    );
};

const Styles = StyleSheet.create({
    headerTitle: {
        fontSize: 14,
        fontWeight: "700",
        textDecorationLine: "underline",
        color: "#575757",
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: "400",
        color: "#575757",
    },
});

export default BottomTab;
