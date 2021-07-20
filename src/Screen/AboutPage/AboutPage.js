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
} from 'react-native';
import { useContextValue } from './../../context/context';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import unpam from './../../assets/unpam.png';

const AboutPage = ({ navigation }) => {
  const [{ api }] = useContextValue();

  let req = async () => {};

  useEffect(() => {
    // console.log(Dimensions.get('window').height);
    // console.log(props);
    // req();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderBar navigation={navigation} />
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Aplikasi Sistem Pakar Diagnosa Penyakit Hewan Iguana
          </Text>
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>
            Aplikasi ini dibuat sebagai sebagai persyaratan untuk memperoleh gelar sarjana
            jurusan Teknik Informatika Universitas Pamulang
          </Text>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Oleh :</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>Pajri Mardani</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Dosen Pembimbing :</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>
              Mochamad Adhari Adiguna, S.ST, M.kom
            </Text>
          </View>

          <Image style={{ width: 150, height: 150 }} source={unpam} resizeMode="contain" />

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
            <Text>Email : fajrimardani9@gmail.com </Text>
            <Text>WA :081383160518</Text>
            <Text>Instagram : fajri_mrdn</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
