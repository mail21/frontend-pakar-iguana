import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationDrawerStructure from './../../components/NavigationDrawerStructure';
import DetailComponent from './DetailComponent';

const DetailPage = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Detail Event">
      <Stack.Screen
        name="Detail Event"
        component={DetailComponent}
        options={{
          title: 'Detail Event', //Set Header Title
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailPage;
