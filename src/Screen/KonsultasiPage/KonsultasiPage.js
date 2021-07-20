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
  Button,
  Modal,
  ToastAndroid,
  Alert,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import { useContextValue } from './../../context/context';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import RadioButton from 'expo-radio-button';
import { useIsFocused } from '@react-navigation/native';

const KonsultasiPage = ({ navigation }) => {
  const [{ api }] = useContextValue();
  const Stack = createStackNavigator();
  const [check, setCheck] = useState('');
  const [iterations, setIterations] = useState(0);
  const [iteration, setIteration] = useState(1);
  const [totalPenyakit, setTotalPenyakit] = useState(1);
  const [kuesioner, setKuesioner] = useState([]);
  const [load, setLoad] = useState(false);
  const [lengthGejala, setLengthGejala] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [penyakit, setPenyakit] = useState({});
  const isFocused = useIsFocused();

  let req = async () => {
    await axios
      .get(`${api}/get_gejala_join`)
      .then((res) => {
        setIterations(0);
        setKuesioner(res.data.results);
        console.log(res.data.results);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCheck('');
    setLoad(true);
    setIterations(0);
    setIteration(1);
    axios
      .get(`${api}/get_penyakit_aktif`)
      .then((res) => {
        setTotalPenyakit(res.data.results.length);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
    req();
  }, [isFocused]);

  const handleLanjut = () => {
    setLengthGejala(
      kuesioner.filter((item) => item.id_penyakit == kuesioner[0].id_penyakit).length
    );
    if (check == 'iya') {
      if (iterations + 1 == lengthGejala) {
        setPenyakit(kuesioner[iterations]);
        setModalVisible(true);
      } else {
        setIterations((prev) => prev + 1);
        setCheck('');
      }
    } else if (check == 'tidak') {
      console.log(totalPenyakit);
      console.log(iteration);
      if (iteration >= totalPenyakit) {
        Alert.alert(
          'Hasil Diagnosa',
          'Iguana Anda Sehat',
          [{ text: 'Kembali', onPress: () => navigation.navigate('Home') }],
          { cancelable: false }
        );
      }
      setIterations(0);
      setKuesioner((prev) =>
        prev.filter((item) => item.id_penyakit != kuesioner[0].id_penyakit)
      );
      setIteration((prev) => prev + 1);
      setCheck('');
    } else {
      ToastAndroid.show('Dimohon Untuk Menjawab', ToastAndroid.SHORT);
    }
  };

  return (
    <Stack.Navigator initialRouteName="Konsultasi">
      <Stack.Screen
        name="Konsultasi"
        component={() => (
          <>
            {load ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : (
              <View style={styles.container}>
                <ScrollView>
                  <Text style={{ textAlign: 'center', fontSize: 18, margin: 20 }}>
                    Apakah Iguana Anda Mengalami Gejala Berikut :
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginVertical: 20,
                      fontWeight: 'bold',
                      fontSize: 17,
                      textTransform: 'capitalize',
                    }}
                  >
                    {kuesioner.length ? kuesioner[iterations].desc_kuesioner : ''}
                  </Text>
                  <Text style={{ textAlign: 'center' }}>Konfirmasi</Text>
                  <View>
                    <RadioButton
                      value="iya"
                      containerStyle={{
                        marginBottom: 10,
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        justifyContent: 'space-between',
                      }}
                      radioStyle={{ borderColor: 'black' }}
                      selected={check}
                      onSelected={(value) => setCheck(value)}
                      radioBackground="black"
                    >
                      <Text>Iya</Text>
                    </RadioButton>
                    <RadioButton
                      value="tidak"
                      selected={check}
                      containerStyle={{
                        marginBottom: 10,
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                        justifyContent: 'space-between',
                      }}
                      radioStyle={{ borderColor: 'black' }}
                      onSelected={(value) => setCheck(value)}
                      radioBackground="black"
                    >
                      <Text>Tidak</Text>
                    </RadioButton>
                  </View>
                  <TouchableHighlight
                    onPress={handleLanjut}
                    style={{ margin: 40, backgroundColor: 'black', padding: 10 }}
                  >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Lanjut</Text>
                  </TouchableHighlight>
                </ScrollView>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text
                        style={{
                          ...styles.modalText,
                          alignSelf: 'flex-start',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                      >
                        Hasil Diagnosa
                      </Text>
                      <Text style={styles.modalText}>
                        Iguana Anda Terindikasi Terkena Penyakit {penyakit.nama}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight
                          style={{
                            ...styles.openButton,
                            backgroundColor: '#636940',
                            // width: 70,
                          }}
                          onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Daftar Penyakit', {
                              screen: 'DetailPenyakit',
                              params: {
                                id_penyakit: penyakit.id_penyakit,
                              },
                            });
                          }}
                        >
                          <Text style={styles.textStyle}>Lihat Detail Penyakit</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </>
        )}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.navigate('Dashboard', {
                  screen: 'Dashboard',
                });
              }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),

          headerStyle: {
            backgroundColor: '#fff', //Set Header color
            // height: 80,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          },
          headerTintColor: 'black',
          headerTitle: 'Konsultasi',
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BDEAC',
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
    backgroundColor: 'black',
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
    padding: 10,
    elevation: 2,
  },
});

export default KonsultasiPage;
