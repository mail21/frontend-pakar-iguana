import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { useContextValue } from './../../context/context';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import RadioButton from 'expo-radio-button';

const KonsultasiPage = ({ navigation }) => {
  const [{ api }] = useContextValue();
  const Stack = createStackNavigator();
  const [current, setCurrent] = useState('Iya');

  let req = async () => {};

  useEffect(() => {
    // console.log(Dimensions.get('window').height);
    // console.log(props);
    // req();
  }, []);
  return (
    <Stack.Navigator initialRouteName="Konsultasi">
      <Stack.Screen
        name="Konsultasi"
        component={() => (
          <View style={styles.container}>
            <ScrollView>
              <Text style={{ textAlign: 'center', fontSize: 18, margin: 20 }}>
                Apakah Iguana Anda Mengalami Gejala Berikut ?
              </Text>
              <Text style={{ textAlign: 'center' }}>Konfirmasi</Text>
              <View>
                <RadioButton
                  value="Iya"
                  containerStyle={{
                    marginBottom: 10,
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    justifyContent: 'space-between',
                  }}
                  radioStyle={{ borderColor: 'black' }}
                  selected={current}
                  onSelected={(value) => setCurrent(value)}
                  radioBackground="black"
                >
                  <Text>Iya</Text>
                </RadioButton>
                <RadioButton
                  value="Tidak"
                  selected={current}
                  containerStyle={{
                    marginBottom: 10,
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    justifyContent: 'space-between',
                  }}
                  radioStyle={{ borderColor: 'black' }}
                  onSelected={(value) => setCurrent(value)}
                  radioBackground="black"
                >
                  <Text>Tidak</Text>
                </RadioButton>
              </View>
              <TouchableOpacity style={{ margin: 40, backgroundColor: 'black', padding: 10 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Lanjut</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate('Dashboard', {
                  screen: 'Dashboard',
                });
              }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),

          headerStyle: {
            backgroundColor: '#fff', //Set Header color
            // height: 80,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          },
          headerTintColor: 'black',
          headerTitle: 'Konsultasi',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BDEAC',
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: '15px',
  },
});

export default KonsultasiPage;
