import React from 'react';
import { View, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from '../helper/Colors';

const ThankYou = ({image, text}) => {
  return (
    <View style={Styles.container}>
        <Image style={Styles.image} source={{ uri: image }} />
        <Text style={Styles.text}>{text}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.black,
        marginTop: 30
    }
});

export default ThankYou;
