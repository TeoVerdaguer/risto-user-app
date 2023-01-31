import React from 'react'
import Main from './src/components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
        <Main />
    </SafeAreaProvider>
  );
};

export default App;
