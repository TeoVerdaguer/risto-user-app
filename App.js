import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTab from './src/navigation/BottomTab'

const App = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <BottomTab />
        </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;
