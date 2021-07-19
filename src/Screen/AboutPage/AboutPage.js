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
        <Text>Aplikasi Ini dibuat Oleh Fajri Mardani</Text>
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
