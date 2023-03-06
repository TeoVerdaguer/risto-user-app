import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTab from "./src/navigation/BottomTab";

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor={'#fff'}
                barStyle="dark-content"
            />
            <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
        </SafeAreaProvider>
        
    );
};

export default App;
