import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import seminar from './../../image/seminar1.jpeg';
import { useContextValue } from './../../context/context';
import axios from 'axios';

const DetailComponent = ({ navigation, route }) => {
  const { no_event, otherParam } = route.params;
  const [Tab, setTab] = useState('deskripsi');
  const [{ api, load, user }, dispatch] = useContextValue();
  const [seminar, setSeminar] = useState('');
  const [statusUser, setStatusUser] = useState('');
  const [narasumber, setNarasumber] = useState('');
  const [organizer, setOrganizer] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const req = async () => {
    dispatch({ type: 'UPDATE_LOADING' });
    await axios.get(`${api}/events-detail-user/${no_event}/${user.username}`).then((res) => {
      setSeminar(res.data.results);
      setStatusUser(res.data.status_user);
      setOrganizer(res.data.organizers);
      setNarasumber(JSON.parse(res.data.results.narasumber));
      dispatch({ type: 'UPDATE_LOADING' });
    });
  };

  useEffect(() => {
    req();
  }, []);

  const handleSubmitButton = async () => {
    let dataPeserta = {
      username: user.username,
      no_event: seminar.no_event,
    };

    await axios
      .post(`${api}/peserta`, dataPeserta)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setModalVisible(!modalVisible);
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{`\u2022 ${item.nama_penyelenggara}`}</Text>
    </View>
  );

  return (
    <>
      {load ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.containerMain}>
            <View>
              <Text style={styles.judul}>{seminar.nama_event}</Text>
              <Text style={{ color: '#6c757d', marginVertical: 10 }}>
                Diselenggarakan Oleh
              </Text>
              <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                  data={organizer}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id_penyelenggara}
                />
              </SafeAreaView>
            </View>
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
                  <Text style={styles.modalText}>Apakah Anda Ingin Mendaftar ? </Text>

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
                      onPress={handleSubmitButton}
                    >
                      <Text style={styles.textStyle}>Iya</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>

            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <View style={{ marginVertical: 5, alignItems: 'center' }}>
                <Text>Tanggal Event</Text>
                <Text style={{ fontWeight: 'bold' }}>{seminar.waktu}</Text>
              </View>
              <View style={{ marginVertical: 5, alignItems: 'center' }}>
                <Text>Kuota</Text>
                <Text style={{ fontWeight: 'bold' }}>{seminar.kuota}</Text>
              </View>
              <View style={{ marginVertical: 5, alignItems: 'center' }}>
                <Text>Sisa Kuota</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {seminar.kuota - seminar.kuota_saat_ini}
                </Text>
              </View>
            </View>

            <View style={styles.nav}>
              <TouchableWithoutFeedback onPress={() => setTab('deskripsi')}>
                <View style={Tab === 'deskripsi' ? styles.navItemActive : styles.navItem}>
                  <Text>Deskripsi</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setTab('poster')}>
                <View style={Tab === 'deskripsi' ? styles.navItem : styles.navItemActive}>
                  <Text>Poster</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View>
              {Tab === 'deskripsi' ? (
                <View>
                  <Text style={{ fontSize: 28, fontWeight: '400' }}>Narasumber</Text>
                  <View style={{ padding: 10 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                      <FlatList
                        data={narasumber}
                        renderItem={({ item }) => {
                          return (
                            <View style={{ flexDirection: 'row' }}>
                              <Text>{'\u2022'}</Text>
                              <Text style={{ flex: 1, paddingLeft: 5 }}>{item}</Text>
                            </View>
                          );
                        }}
                        keyExtractor={(item) => item.toString()}
                      />
                    </SafeAreaView>
                  </View>
                  <View style={{ marginVertical: 15 }}>
                    <Text style={{ fontSize: 28, fontWeight: '400' }}>Deskripsi</Text>
                    <Text>{seminar.deskripsi_event}</Text>
                  </View>
                  <Text style={{ fontSize: 28, fontWeight: '400' }}>Catatan</Text>
                  <Text>{seminar.catatan}</Text>
                  <View style={{ marginVertical: 20 }}>
                    <Button title="Daftar" onPress={() => setModalVisible(true)} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="date-range" size={18} color="black" />

                        <Text style={{ fontWeight: 'bold', marginLeft: 4 }}>
                          Batas Daftar & Bayar
                        </Text>
                      </View>
                      <Text>
                        {seminar.tgl_mulai_pembayaran} s/d {seminar.tgl_akhir_pembayaran}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="ticket-alt" size={18} color="black" />
                        <Text style={{ fontWeight: 'bold', marginLeft: 4 }}>Biaya</Text>
                      </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-sharp" size={18} color="black" />
                        <Text style={{ fontWeight: 'bold', marginLeft: 4 }}>Venue</Text>
                      </View>
                      <Text>{seminar.nama_venue}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <Image
                  source={{ uri: `data:image/png;base64,${seminar.poster}` }}
                  style={{ width: '100%', height: 500 }}
                />
                // <Image source={seminar} style={{ flex: 1, height: 500 }} />
                // <></>
              )}
            </View>

            {/* <Button onPress={() => navigation.goBack()} title="Back"  /> */}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 70,
    // backgroundColor: '#fff',
    backgroundColor: '#003f5c',
  },
  containerMain: {
    backgroundColor: '#fff',
    marginVertical: 14,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  judul: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  nav: {
    // borderBottomWidth: '1px',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#dee2e6',
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 0,
    marginVertical: 5,
    // listStyle: 'none',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
  },
  navItem: {
    marginBottom: -1,
    // border: 1px solid transparent,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: 'blue',
  },
  navItemActive: {
    marginBottom: -1,
    color: '#495057',
    backgroundColor: '#fff',
    // borderColor: '#dee2e6 #dee2e6 #fff',
    // border: 1px solid transparent,
    borderWidth: 1,
    borderTopColor: '#dee2e6',
    borderRightColor: '#dee2e6',
    borderLeftColor: '#dee2e6',
    borderBottomColor: '#fff',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 16,
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

export default DetailComponent;
