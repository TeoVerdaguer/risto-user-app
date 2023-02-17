import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

const ImageCarousel = ({ images, height, width }) => {
    console.log(images);
    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                PlaceHolderContent={<ActivityIndicator color="#fff" />}
                source={{ uri: item }}
            />
        );
    };

    return (
        <View>
            <Text>HOla</Text>
            {/* <Carousel
                layout="default"
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
            /> */}
        </View>
    );
};

export default ImageCarousel;
