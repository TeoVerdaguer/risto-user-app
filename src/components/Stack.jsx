import React from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from './Main'
import Login from './Login'
import Map from './Map'
import RestaurantsList from './RestaurantsList'

const Stack = createNativeStackNavigator()

const MyStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name={'Main'}
                component={Main}
            />
            <Stack.Screen
                name={'Login'}
                component={Login}
            />
            <Stack.Screen
                name={'Map'}
                component={Map}
            />
            <Stack.Screen
                name={'RestaurantsList'}
                component={RestaurantsList}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
