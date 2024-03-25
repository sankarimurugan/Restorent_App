import React from 'react';
import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import App1 from './App1';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation, useRoute} from '@react-navigation/native';
import NetworkErrorScreen from './src/screens/NetworkErrorScreen';

function App() {
  const netInfo = useNetInfo();

  return (
    <SafeAreaProvider>
      {netInfo.isConnected == true ? <App1 /> : <NetworkErrorScreen />}
    </SafeAreaProvider>
  );
}

export default App;
