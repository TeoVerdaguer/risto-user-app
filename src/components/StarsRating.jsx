import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

const StarsRating = ({ heading, setScore }) => {
    const [starRating, setStarRating] = useState(null);

    useEffect(() => {
        setScore(starRating);
    }, [starRating]);

    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>
                {heading}
            </Text>
            <View style={Styles.stars}>
                <TouchableOpacity onPress={() => setStarRating(1)}>
                    <Ionicons
                        name={starRating >= 1 ? "star" : "star-outline"}
                        size={32}
                        style={
                            starRating >= 1
                                ? Styles.starSelected
                                : Styles.starUnselected
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(2)}>
                    <Ionicons
                        name={starRating >= 2 ? "star" : "star-outline"}
                        size={32}
                        style={
                            starRating >= 2
                                ? Styles.starSelected
                                : Styles.starUnselected
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(3)}>
                    <Ionicons
                        name={starRating >= 3 ? "star" : "star-outline"}
                        size={32}
                        style={
                            starRating >= 3
                                ? Styles.starSelected
                                : Styles.starUnselected
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(4)}>
                    <Ionicons
                        name={starRating >= 4 ? "star" : "star-outline"}
                        size={32}
                        style={
                            starRating >= 4
                                ? Styles.starSelected
                                : Styles.starUnselected
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(5)}>
                    <Ionicons
                        name={starRating >= 5 ? "star" : "star-outline"}
                        size={32}
                        style={
                            starRating >= 5
                                ? Styles.starSelected
                                : Styles.starUnselected
                        }
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const IOS = Platform.OS === "ios";

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: IOS ? 25 : 20
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      stars: {
        display: 'flex',
        flexDirection: 'row',
      },
      starUnselected: {
        color: '#aaa',
      },
      starSelected: {
        color: '#54A432',
      },
});

export default StarsRating;
