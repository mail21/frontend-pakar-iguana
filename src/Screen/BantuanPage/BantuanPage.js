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
import sshome from './../../assets/sshome.png';
import sstentang from './../../assets/sstentang.png';
import ssdaftarpenyakit from './../../assets/ssdaftarpenyakit.png';
import sskuesioner from './../../assets/sskuesioner.png';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from '../../components/NavigationDrawerStructure';
import gambar from './../../assets/iguanah.png';

const BantuanPage = ({ navigation }) => {
  const [{ api, load }, dispatch] = useContextValue();
  const [data, setData] = useState([]);
  const [dataSlide, setDataSlide] = useState([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const Stack = createStackNavigator();

  let req = async () => {
    dispatch({ type: 'UPDATE_LOADING' });
    await axios
      .get(`${api}/events-dashboard`, { params: { page: currentPage } })
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.resultsSlide);
        setData(res.data.results.data);
        setDataSlide(res.data.resultsSlide);
        setPageTotal(res.data.results.last_page);
        setCurrentPage(res.data.results.current_page);
        // console.log(res.data.resultsSlide);
        // setload(!load);
        dispatch({ type: 'UPDATE_LOADING' });
      });
  };

  useEffect(() => {
    // console.log(Dimensions.get('window').height);
    // console.log(props);
    // req();
  }, []);
  return (
    <Stack.Navigator initialRouteName="Bantuan">
      <Stack.Screen
        name="Bantuan"
        component={() => (
          <View style={styles.container}>
            <ScrollView>
              <View style={{ padding: 15 }}>
                <View style={styles.containerIsi}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Menu Utama </Text>
                  <Image
                    style={{
                      width: 150,
                      height: 250,
                      marginVertical: 20,
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    source={sshome}
                    resizeMode="contain"
                  />
                  <Text style={{ textAlign: 'justify' }}>
                    Tampilan menu utama aplikasi. Terdiri dari empat buah sub menu yang dapat
                    dipilih dengan menekan icon sub-menu.
                  </Text>
                </View>
                <View style={styles.containerIsi}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Menu Daftar Penyakit{' '}
                  </Text>
                  <Image
                    style={{
                      width: 150,
                      height: 250,
                      marginVertical: 20,
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    source={ssdaftarpenyakit}
                    resizeMode="contain"
                  />

                  <Text style={{ textAlign: 'justify' }}>
                    Pada menu ini anda dapat melihat daftar penyakit, nama penyakit iguana dan
                    mengetahui gejala dari masing-masing penyakit iguana tersebut. Anda juga
                    dapat mengetahui solusi/penangananya untuk mengatasi penyakit yang di
                    derita iguana kesayangan anda.
                  </Text>
                </View>
                <View style={styles.containerIsi}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Menu Konsultasi</Text>
                  <Image
                    style={{
                      width: 150,
                      height: 250,
                      marginVertical: 20,
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    source={sskuesioner}
                    resizeMode="contain"
                  />
                  <Text style={{ textAlign: 'justify' }}>
                    Pada menu ini anda dapat melakukan konsultasi mengenai masalah penyakit
                    yang di derita iguana kesayangan anda. Ketika anda memilih menu konsultasi
                    maka akan muncul kuisoner/pertanyaan gejala dan anda harus menjawab
                    beberapa pertanyaan dari gejala-gejala yang telah di sediakan, kemudian
                    jawaban-jawaban anda akan di proses untuk hasil diagnosa. Dengan menekan
                    button “YA” atau “TIDAK” untuk menjawab pertanyaan yang diajukan oleh
                    sistem setelah selesai hasil diagnosa akan ditampilkan.
                  </Text>
                </View>
                <View style={styles.containerIsi}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Menu Tentang</Text>
                  <Image
                    style={{
                      width: 150,
                      height: 250,
                      marginVertical: 20,
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    source={sstentang}
                    resizeMode="contain"
                  />
                  <Text style={{ textAlign: 'justify' }}>
                    Pada menu ini anda dapat melihat info tentang aplikasi pakar iguana. Anda
                    juga dapat melakukan aksi untuk mengirim kritik dan saran maupun pertanyaan
                    melalui tiga media sosial yang tersedia pada menu tersebut antara lain
                    Email, whatsApp dan Instagram admin/ si pembuat aplikasi ini.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerRight: () => (
            <Image style={{ width: 80, height: 80, marginRight: 20 }} source={gambar} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
            height: 150,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          },
          headerTintColor: 'black',
          headerTitle: () => (
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bantuan</Text>
            </View>
          ),
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
  containerIsi: {
    marginVertical: 10,
  },
});

export default BantuanPage;
