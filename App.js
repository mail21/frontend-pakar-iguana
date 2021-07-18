import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import MainPage from './src/Screen/MainPage/MainPage';
import DrawerStartPage from './src/Screen/DrawerStartPage/DrawerStartPage';

import { useContextValue, StateProvider } from './src/context/context';
import { initialState, reducer } from './src/context/reducer';

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MainApp />
    </StateProvider>
  );
}

function MainApp() {
  const [context, dispatch] = useContextValue();
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);
  return (
    <NavigationContainer>
      {/* {context.isSignout ? ( */}
      {false ? (
        // <Stack.Screen name="SignIn" component={SignInScreen} />
        <DrawerStartPage />
      ) : (
        <MainPage />
        // <Stack.Screen name="Main" component={MainPage} />
      )}
    </NavigationContainer>
  );
}
