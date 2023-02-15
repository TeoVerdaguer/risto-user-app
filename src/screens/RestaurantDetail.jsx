import * as React from "react";
import { Image, View, Text } from "react-native";
import { useState, useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";

function RestaurantDetail({ route }) {

    const businessId = route.params.id;

    const [business, setBusiness] = useState([]);

    const getBusinessDetail = async () => {
        const URL =
            'https://risto-api-dev.dexterdevelopment.io/business/get-business-detail/?business=' + businessId;
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const responseJson = await response.json();

            let image = '';
            if (responseJson.data.resource_list[0] && responseJson.data.resource_list[0].resource_image) {
              image = responseJson.data.resource_list[0].resource_image;
            } else {
                image = 'https://picsum.photos/200';
            }
            let businessData = {
                img: image,
                name: responseJson.data.business_name,
                address: responseJson.data.business_address
            };
            setBusiness(businessData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect( () => {
        getBusinessDetail();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <ImageCarousel />
            <Text>{business.name}</Text>
            <Text>{business.address}</Text>
            <Image style={{ height: 200, width: 200}} source={{ uri: business.img }} />
        </View>
    );
}

export default RestaurantDetail;
