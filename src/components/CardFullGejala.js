import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useContextValue } from './../context/context';
export default function CardAdminPenyakit({
  navigation,
  nama,
  id_penyakit,
  id_gejala,
  gejala,
}) {
  const [{ api }] = useContextValue();
  const [modalVisible, setModalVisible] = useState(false);

  const handleIya = async () => {
    setModalVisible(false);
    await axios
      .delete(`${api}/delete_gejala/${id_gejala}`)
      .then((msg) => console.log('success', msg))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.card}>
      <View style={{ flex: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
          Penyakit : {nama}
        </Text>
        <Text>{gejala}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Apakah Anda Ingin Menghapus ? </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#2196F3',
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Tidak</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#2196F3', width: 70 }}
                  onPress={handleIya}
                >
                  <Text style={styles.textStyle}>Iya</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditGejala', {
              id_penyakit: id_penyakit,
              id_gejala: id_gejala,
            });
          }}
        >
          <SimpleLineIcons name="pencil" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="trash-alt" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    width: Dimensions.get('window').width - 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'white',
    // backgroundColor: 'transparent',
    opacity: 0.9,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
