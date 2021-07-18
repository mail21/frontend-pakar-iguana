import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationDrawerStructure from './../../components/NavigationDrawerStructure';
import EventComponent from './EventComponent';

function EventPage({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Event">
      <Stack.Screen
        name="Event"
        component={EventComponent}
        options={{
          title: 'Event', //Set Header Title
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
}

export default EventPage;
