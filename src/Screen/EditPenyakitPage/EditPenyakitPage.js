import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import * as ImagePicker from 'expo-image-picker';
import { useContextValue } from './../../context/context';

const EditPenyakitPage = ({ navigation, route }) => {
  const { id_penyakit } = route.params;

  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [saran, setSaran] = useState('');
  const [foto, setFoto] = useState('');
  const [perubahan, setPerubahan] = useState(false);
  const [{ api }] = useContextValue();
  const [load, setLoad] = useState(false);

  let req = async () => {
    setLoad(true);
    await axios
      .get(`${api}/get_penyakit_by_id/${id_penyakit}`)
      .then((res) => {
        setNama(res.data.results.nama);
        setDeskripsi(res.data.results.desc_penyakit);
        setSaran(res.data.results.desc_pengobatan);
        setFoto(res.data.results.gambar);
        setLoad(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    req();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setFoto(result.uri);
    setPerubahan(true);
    console.log(result);
  };

  const submit = async () => {
    navigation.navigate('Daftar Penyakit');
    if (perubahan) {
      let data = {
        nama_penyakit: nama,
        desc_penyakit: deskripsi,
        desc_pengobatan: saran,
        foto_penyakit: foto,
        id_penyakit: id_penyakit,
      };
      await axios
        .put(`${api}/update_penyakit`, data)
        .then((msg) => console.log('success', msg))
        .catch((error) => console.log(error));
    } else {
      let data = {
        nama_penyakit: nama,
        desc_penyakit: deskripsi,
        desc_pengobatan: saran,
        id_penyakit: id_penyakit,
      };
      await axios
        .put(`${api}/update_penyakit2`, data)
        .then((msg) => console.log('success', msg))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {load ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BDEAC',
    // alignItems: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BDEAC',
  },
});
export default EditPenyakitPage;
