import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Button,
  ToastAndroid,
  Image,
} from 'react-native';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import * as ImagePicker from 'expo-image-picker';
import { useContextValue } from './../../context/context';

const TambahPenyakitPage = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [saran, setSaran] = useState('');
  const [foto, setFoto] = useState('');
  const [{ api }] = useContextValue();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    setFoto(`data:image/png;base64,${result.base64}`);
    // console.log(result);
  };

  const submit = async () => {
    let data = {
      nama_penyakit: nama,
      desc_penyakit: deskripsi,
      desc_pengobatan: saran,
      foto_penyakit: foto,
    };
    if (nama === '' || deskripsi === '' || saran === '' || foto === '') {
      console.log('Data Ada Yang Kosong');
      ToastAndroid.show(`Data Ada Yang Kosong`, ToastAndroid.SHORT);
    } else {
      navigation.navigate('Daftar Penyakit');
      await axios
        .post(`${api}/create_penyakit`, data)
        .then((msg) => console.log('success', msg))
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('error.response');

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('error.request');

            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error Message', error.message);
          }
          console.log('error.config', error.config);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Nama Penyakit</Text>
          <TextInput
            style={{
              height: 40,
              fontSize: 20,
              borderColor: 'black',
              borderBottomWidth: 1,
              padding: 5,
            }}
            onChangeText={(text) => setNama(text)}
            value={nama}
            placeholder="Nama"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Deskripsi Penyakit</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{
              height: 100,
              fontSize: 20,
              borderColor: 'black',
              borderBottomWidth: 1,
              padding: 5,
            }}
            onChangeText={(text) => setDeskripsi(text)}
            value={deskripsi}
            placeholder="Deskripsi Penyakit"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Saran Pengobatan</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={{
              height: 100,
              fontSize: 20,
              borderColor: 'black',
              borderBottomWidth: 1,
              padding: 5,
            }}
            onChangeText={(text) => setSaran(text)}
            value={saran}
            placeholder="Saran Pengobatan"
          />
        </View>
        <View style={{ marginVertical: 25 }}>
          <Button title="Upload Foto" onPress={pickImage} color="black" />
        </View>
        <View>
          {foto == '' ? (
            <></>
          ) : (
            <Image
              style={{ width: Dimensions.get('window').width, height: 300 }}
              source={{
                uri: foto,
              }}
              resizeMode="contain"
            />
          )}
        </View>

        <TouchableOpacity
          style={{ marginVertical: 25, backgroundColor: 'black', padding: 10 }}
          onPress={submit}
        >
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BDEAC',

    // alignItems: 'center',
  },
});
export default TambahPenyakitPage;
