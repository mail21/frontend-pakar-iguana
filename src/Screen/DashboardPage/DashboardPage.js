import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationDrawerStructure from './../../components/NavigationDrawerStructure';
import DashboardComponent from './DashboardComponent';
import gambar from './../../assets/iguanah.png';

const DashboardPage = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerRight: () => (
            <Image style={{ width: 80, height: 80, marginRight: 20 }} source={gambar} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
            height: 150,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          },
          headerTintColor: 'black',
          headerTitle: () => (
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sistem Pakar Diagnosa</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Penyakit Hewan Iguana</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardPage;
