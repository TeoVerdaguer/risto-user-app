import React from 'react';
import {SafeAreaView, View, Button, Text} from 'react-native';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

const RestaurantsList = ({navigation}) => {
  let [provincias, setProvincias] = useState('');
  let [restaurant, setRestaurant] = useState('');

  const getProvincias = async () => {
    const URL = 'https://api-ibook-dev.herokuapp.com/genericos/get-provinces/';

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      setProvincias(responseJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRestaurant = async (provinceId, userId) => {
    const URL =
      'https://api-ibook-dev.herokuapp.com/business/get-business-list/?province=' +
      provinceId +
      '&user_id=' +
      userId;

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      setRestaurant(responseJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarProvincias = provincias => {
    let listaProvincias = [];
    for (let i = 0; i < provincias.length; i++) {
      listaProvincias.push(provincias[i].province_name);
    }
    return listaProvincias.map(prov => {
      return <Text style={Styles.text}>{prov}</Text>;
    });
  };

  return (
    <SafeAreaView>
      <View style={Styles.btnContainer}>
        <Button
          title="GET provincias"
          color="#22C676"
          onPress={() => {
            getProvincias();
          }}
        />
      </View>

      <View style={Styles.btnContainer}>
        <Button
          title="GET restaurant"
          color="#22C676"
          onPress={() => {
            getRestaurant('1', 'd90f0b537aff11edb36a548aaed1f418');
          }}
        />
      </View>

      <View style={Styles.txtContainer}>
        <View style={Styles.listContainer}>
          {provincias
            ? mostrarProvincias(provincias)
            : null}
        </View>
        <View style={Styles.restoInfoContainer}>
          <Text>
            {restaurant
              ? restaurant
              : null}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  txtContainer: {
    height: '70%',
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 10,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  restoInfoContainer: {},
  btnContainer: {
    margin: 20,
  },
});

export default RestaurantsList;
