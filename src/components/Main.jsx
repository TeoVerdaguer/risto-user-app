import React from 'react'
import { SafeAreaView, Button, View } from 'react-native'
import { StyleSheet } from 'react-native'

const Main = ({ navigation }) => {
  return (
    <SafeAreaView>
        <View style={Styles.btnContainer}>
            <Button
                color={'#22C676'}
                title="Go to map"
                onPress={() =>
                    navigation.navigate('Map')
                }
            />
        </View>
        <View style={Styles.btnContainer}>
            <Button
                color={'#22C676'}
                title='Go to Login'
                onPress={() => 
                    navigation.navigate('Login')
                }
            />
        </View>
        <View style={Styles.btnContainer}>
            <Button
                color={'#22C676'}
                title='Go to Restaurants List'
                onPress={() => 
                    navigation.navigate('RestaurantsList')
                }
            />
        </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
    btnContainer: {
        margin: 10
    }
})

export default Main