import React, { useState, useRef } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";

const ImageCarousel = ({ images, height, width }) => {

    const [active, setActive] = useState(0);
    const isCarousel = useRef(null);

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
        <View style={{ height: '100%' }}>
            <Carousel
                ref={isCarousel}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
                onSnapToItem={(index) => setActive(index)}
            />
            <Pagination
              dotsLength={images.length}
              activeDotIndex={active}
              carouselRef={isCarousel}
              containerStyle={{ backgroundColor: 'transparent', position: "absolute", zIndex: 2, bottom: -20, left: 0, right: 0, marginHorizontal: 'auto' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              tappableDots={true}
              inactiveDotStyle={{
                  backgroundColor: '#e5e5e5'
              }}
              inactiveDotOpacity={0.8}
              inactiveDotScale={0.6}
            />
        </View>
    );
};

export default ImageCarousel;
