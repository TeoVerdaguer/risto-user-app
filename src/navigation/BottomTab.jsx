import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Map from '../screens/Map';
import CreateReservation from '../components/CreateReservation';
import Reservations from '../screens/Reservations';
import User from '../screens/User';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Explorar' component={HomeScreen}/>
        <Tab.Screen name='Mapa' component={Map} />
        <Tab.Screen name='Nueva' component={CreateReservation} />
        <Tab.Screen name='Reservas' component={Reservations} />
        <Tab.Screen name='Usuario' component={User} />
    </Tab.Navigator>
  )
}

export default BottomTab;