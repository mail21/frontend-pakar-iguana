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

const DetailPenyakitPage = ({ navigation, route }) => {
  const { id_penyakit } = route.params;
  const [{ api }] = useContextValue();
  const [dataPenyakit, setDataPenyakit] = useState([]);
  const [dataGejala, setDataGejala] = useState([]);
  const [load, setLoad] = useState(false);

  let req = async () => {
    setLoad(true);
    await axios.get(`${api}/get_detail/${id_penyakit}`).then((res) => {
      setLoad(false);
      setDataPenyakit(res.data.results_penyakit);
      setDataGejala(res.data.results_gejala);
    });
  };

  useEffect(() => {
    req();
  }, []);
  return (
    <>
      {load ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ marginVertical: 20, fontSize: 17 }}>{dataPenyakit.nama}</Text>
              <Image
                style={{ width: Dimensions.get('window').width, height: 300 }}
                source={{
                  uri: dataPenyakit.gambar,
                }}
                resizeMode="contain"
              />
              <View style={{ alignItems: 'center', marginVertical: 40 }}>
                <Text style={{ fontWeight: 'bold' }}>Deskripsi</Text>
                <Text>{dataPenyakit.desc_penyakit}</Text>
              </View>

              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Text style={{ fontWeight: 'bold' }}>Gejala</Text>
                {dataGejala.map((el) => (
                  <Text key={el.id_gejala} style={{ marginVertical: 4 }}>
                    {el.desc_gejala}
                  </Text>
                ))}
              </View>

              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Text style={{ fontWeight: 'bold' }}>Saran Pengobatan</Text>
                <Text>{dataPenyakit.desc_pengobatan}</Text>
              </View>
            </View>
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
});

export default DetailPenyakitPage;
