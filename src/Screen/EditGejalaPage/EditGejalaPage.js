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
  Picker,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import { useContextValue } from './../../context/context';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialIcons } from '@expo/vector-icons';

const EditGejalaPage = ({ navigation, route }) => {
  const { id_penyakit, id_gejala } = route.params;

  const [deskripsiGejala, setDeskripsiGejala] = useState('');
  const [kuesioner, setKuesioner] = useState('');
  const [namaPenyakit, setNamaPenyakit] = useState('');
  const [{ api }] = useContextValue();
  const [idPilihan, setIdPilihan] = useState('');
  const [penyakit, setPenyakit] = useState([]);
  useEffect(() => {
    axios.get(`${api}/get_penyakit`).then((res) => {
      setPenyakit(res.data.results);
    });
    axios.get(`${api}/get_gejala_by_id/${id_gejala}`).then((res) => {
      //   console.log(res.data.results);
      setKuesioner(res.data.results.desc_kuesioner);
      setIdPilihan(res.data.results.id_penyakit);
      setDeskripsiGejala(res.data.results.desc_gejala);
      setNamaPenyakit(res.data.results.nama);
    });
  }, []);

  const submit = async () => {
    let data = {
      id_penyakit: idPilihan,
      id_gejala: id_gejala,
      desc_gejala: deskripsiGejala,
      desc_kuesioner: kuesioner,
    };

    navigation.navigate('Daftar Gejala');
    await axios
      .put(`${api}/update_gejala/${id_gejala}`, data)
      .then((msg) => console.log('success', msg))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Pilih Penyakit</Text>
          <SelectDropdown
            data={penyakit}
            buttonStyle={{
              width: Dimensions.get('window').width - 30,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            // rowStyle={{ backgroundColor: 'red' }}
            defaultButtonText={namaPenyakit}
            renderDropdownIcon={() => (
              <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
            )}
            onSelect={(selectedItem, index) => {
              console.log('id', selectedItem.id_penyakit);
              setIdPilihan(selectedItem.id_penyakit);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.nama;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.nama;
            }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Deskripsi Gejala</Text>
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
            onChangeText={(text) => setDeskripsiGejala(text)}
            value={deskripsiGejala}
            placeholder="Deskripsi Gejala"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 10, fontSize: 20 }}>Deskripsi Kuesioner</Text>
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
            onChangeText={(text) => setKuesioner(text)}
            value={kuesioner}
            placeholder="Kuesioner"
          />
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
export default EditGejalaPage;
