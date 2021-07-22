import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ToastAndroid,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import gambar from './../../assets/iguanah.png';
import background from './../../assets/background.jpg';
import { useIsDrawerOpen } from '@react-navigation/drawer';

const StartPage = ({ navigation }) => {
  const dimensions = Dimensions.get('window');
  const isDrawerOpen = useIsDrawerOpen();
  React.useEffect(() => {
    navigation.closeDrawer();
  }, [isDrawerOpen]);

  return (
    <ImageBackground source={background} style={styles.container}>
      <View
        style={{
          width: dimensions.width,
          alignItems: 'flex-end',
          paddingRight: 30,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity
          style={styles.loginBtnAdmin}
          onPress={() => navigation.navigate('Login Admin')}
        >
          <Text style={styles.loginText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={{ width: 100, height: 100 }} source={gambar} />
      </View>
      <View style={{ width: dimensions.width, alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Daftar User')}
        >
          <Text style={styles.loginText}>Registrasi User</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    // color: '#fb5b5a',
    color: '#fff',
    marginBottom: 40,
    marginTop: 150,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    // flexDirection: 'row',
    position: 'relative',
  },
  inputText: {
    height: 50,
    color: 'white',
    fontSize: 15,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#59A96A',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  loginBtnAdmin: {
    // width: '80%',
    backgroundColor: '#59A96A',
    borderRadius: 10,
    padding: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
  },
  hidePassStyle: {
    position: 'absolute',
    right: 25,
    // backgroundColor: '#465881',
    // backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'black',
    // backgroundColor: 'transparent',
    opacity: 0.7,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default StartPage;
