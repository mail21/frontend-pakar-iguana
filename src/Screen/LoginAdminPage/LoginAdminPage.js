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
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useContextValue } from './../../context/context';

const LoginAdminPage = ({ navigation }) => {
  const [{ api }, dispatch] = useContextValue();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, sethidePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const dimensions = Dimensions.get('window');

  const signIn = async (data) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
    setModalVisible(!modalVisible);
    await axios
      .post(`${api}/login`, data)
      .then((res) => {
        // console.log(res.data.token);
        setModalVisible(!modalVisible);
        dispatch({
          type: 'LOGIN_ADD_USER',
          payload: {
            username: data.username,
            fullname: res.data.user.nama_lengkap,
            role_user: res.data.user.role,
          },
        });
        dispatch({
          type: 'LOGIN',
          token: res.data.token,
        });
        // dispatch({ type: 'UPDATE_LOADING' });
      })
      .catch((res) => {
        // setMessage(res.response.data.error);
        // setLoginResultError(true);
        // console.log(res.response);
        // console.log(res.response.data.error);
        setModalVisible(false);
        ToastAndroid.show(res.response.data.error, ToastAndroid.SHORT);
      });
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://cutewallpaper.org/21/forest-green-background/Animated-Colors-Green-Backgrounds,-Background-Photos-and-.gif',
        // uri: 'https://media.istockphoto.com/vectors/green-transparent-leaves-seamless-pattern-background-vector-id1224344942?b=1&k=6&m=1224344942&s=612x612&w=0&h=6DIaLJPzSDu9e-ni5CYvqggiMBmXhvDeh4iLybP-sMI=',
      }}
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container2}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignSelf: 'flex-start', marginLeft: 30, marginTop: 25 }}
        >
          <Ionicons name="arrow-back-sharp" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.logo}>Login Admin</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="#003f5c"
            placeholderTextColor="#fff"
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        </View>
      </Modal> */}
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#fff"
            onChangeText={setPassword}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity
            onPress={() => sethidePass(!hidePass)}
            style={styles.hidePassStyle}
          >
            <Entypo name={hidePass ? 'eye-with-line' : 'eye'} size={17} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => signIn({ username, password })}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  container2: {
    flex: 1,
    // backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    width: Dimensions.get('window').width,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    // color: '#fb5b5a',
    color: 'white',
    marginBottom: 40,
    marginTop: 150,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#636940',
    borderRadius: 10,
    height: 46,
    // marginBottom: 15,
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

export default LoginAdminPage;
