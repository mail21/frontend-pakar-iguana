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
import search from './../../assets/search.png';
import clipboard from './../../assets/clipboard.png';
import help from './../../assets/help.png';
import about from './../../assets/about.png';

const DashboardComponent = ({ navigation }) => {
  const [{ api }] = useContextValue();

  let req = async () => {};

  useEffect(() => {
    // console.log(Dimensions.get('window').height);
    // console.log(props);
    // req();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ height: 400, marginTop: 40 }}>
        <View style={styles.containerViewIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Daftar Penyakit')}>
            <Image style={{ width: 120, height: 120 }} source={search} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Daftar Penyakit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Konsultasi')}>
            <Image style={{ width: 120, height: 120 }} source={clipboard} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Konsultasi
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerViewIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Bantuan')}>
            <Image style={{ width: 120, height: 120 }} source={help} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Bantuan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Image style={{ width: 120, height: 120 }} source={about} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Tentang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  containerViewIcon: {
    width: Dimensions.get('window').width,
    height: 130,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMain: {
    // flex: 1,
    flex: 1,
    height: Dimensions.get('window').height - 70,
    // backgroundColor: '#fff',
    backgroundColor: '#003f5c',

    // alignItems: 'center',
    // justifyContent: 'center',
    // marginHorizontal: '25px',
    // marginVertical: '15px',
    // margin: '15px',
  },
});

export default DashboardComponent;
