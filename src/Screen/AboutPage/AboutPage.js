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
  Linking,
} from 'react-native';
import { useContextValue } from './../../context/context';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import unpam from './../../assets/unpam.png';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from '../../components/NavigationDrawerStructure';
import gambar from './../../assets/iguanah.png';

const AboutPage = ({ navigation }) => {
  const [{ api }] = useContextValue();
  const Stack = createStackNavigator();

  let req = async () => {};

  useEffect(() => {
    // console.log(Dimensions.get('window').height);
    // console.log(props);
    // req();
  }, []);
  return (
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen
        name="About"
        component={() => (
          <View style={styles.container}>
            <ScrollView>
              <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Aplikasi Sistem Pakar Diagnosa Penyakit Hewan Iguana
                </Text>
                <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                  Aplikasi ini dibuat sebagai sebagai persyaratan untuk memperoleh gelar
                  sarjana jurusan Teknik Informatika Universitas Pamulang
                </Text>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Oleh :</Text>
                  <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                    Pajri Mardani
                  </Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Dosen Pembimbing :
                  </Text>
                  <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                    Mochamad Adhari Adiguna, S.ST, M.kom
                  </Text>
                </View>

                <Image
                  style={{ width: 150, height: 150 }}
                  source={unpam}
                  resizeMode="contain"
                />

                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 18,
                      marginVertical: 20,
                    }}
                  >
                    FAKULTAS TEKNIK UNIVERSITAS PAMULANG
                  </Text>
                </View>

                <View style={{ alignSelf: 'flex-start', marginTop: 20 }}>
                  <Text
                    style={{
                      marginVertical: 15,
                      color: 'blue',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => Linking.openURL('mailto: fajrimardani9@gmail.com')}
                  >
                    Email : fajrimardani9@gmail.com
                  </Text>

                  <Text
                    style={{
                      marginVertical: 15,
                      color: 'blue',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => Linking.openURL('https://wa.me/6281383160518')}
                  >
                    WA :081383160518
                  </Text>
                  <Text
                    style={{
                      marginVertical: 15,
                      color: 'blue',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => Linking.openURL('https://www.instagram.com/fajri_mrdn/')}
                  >
                    Instagram : fajri_mrdn
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
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
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tentang</Text>
            </View>
          ),
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

export default AboutPage;
