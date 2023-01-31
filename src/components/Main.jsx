import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {Chip, Appbar, Card, FAB} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Main = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    {name: 'pizza y pasta', id: 'pizzaYPasta'},
    {name: 'hamburguesa', id: 'hamburguesa'},
    {name: 'parrillada', id: 'parrillada'},
    {name: 'empanadas', id: 'empanadas'},
    {name: 'sushi', id: 'sushi'},
  ];

  const restaurants = [
    {name: 'Restaurant 1', category: 'pizza y pasta'},
    {name: 'Restaurant 2', category: 'hamburguesa'},
    {name: 'Restaurant 3', category: 'parrillada'},
    {name: 'Restaurant 4', category: 'empanadas'},
    {name: 'Restaurant 5', category: 'sushi'},
  ];

  const filteredRestaurants = restaurants.filter(
    restaurant => !selectedCategory || restaurant.category === selectedCategory,
  );

  const BOTTOM_APPBAR_HEIGHT = 80;
  const MEDIUM_FAB_HEIGHT = 56;

  const {bottom} = useSafeAreaInsets();

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      {/* Header */}
      <Appbar.Header elevated style={{backgroundColor: '#cecece'}}>
        {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
        <View style={Styles.headerBar}>
          <Appbar.Content titleStyle={Styles.subTitle} title="Buscar en" />
          <Appbar.Content title="Ubicacion Actual" />
        </View>
        <Appbar.Action icon="heart" onPress={() => addToFavorites()} />
      </Appbar.Header>

      {/* Search TextInput */}
      <TextInput
        style={{height: 40, margin: 16, borderColor: 'gray', borderWidth: 1}}
        placeholder="Buscar restaurantes"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />

      {/* Categories Filters */}
      <View style={{flexDirection: 'row', flexWrap: 'nowrap', margin: 8}}>
        {categories.map(category => (
          <Chip
            style={{margin: 3, backgroundColor: '#cecece'}}
            key={category.id}
            selected={category.id === selectedCategory}
            onPress={() => setSelectedCategory(category.id)}>
            {category.name}
          </Chip>
        ))}
      </View>

      {/* Text Reservas Dispoibles */}
      <Text style={{fontSize: 20, margin: 10, fontWeight: '700'}}>
        Reservas disponibles
      </Text>

      {/* Cards */}
      <View style={Styles.cardsContainer}>
        <Card style={Styles.card}>
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
        </Card>
      </View>

      {/* Bottom Bar */}
      <Appbar
        style={[
          Styles.bottom,
          {
            height: BOTTOM_APPBAR_HEIGHT + bottom,
          },
        ]}
        safeAreaInsets={{bottom}}>
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="map" onPress={() => {}} />
        <FAB
          mode="flat"
          size="medium"
          icon="plus"
          onPress={() => {}}
          style={[
            Styles.fab,
            {top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2},
          ]}
        />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => {}} />
      </Appbar>
    </View>

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
    flexDirection: 'column',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    height: 270,
    width: 150,
    margin: 10,
  },
  bottom: {
    backgroundColor: '#cecece',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around'
  },
  fab: {
    backgroundColor: '#999999',
    borderRadius: 40
  },
});

export default Main;
