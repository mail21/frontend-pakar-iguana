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
import gejala from './../../assets/gejala.png';
import penyakit from './../../assets/penyakit.png';
import HeaderBar from './../../components/HeaderBar';

const DashboardAdminPage = ({ navigation }) => {
  const [{ api, load }, dispatch] = useContextValue();
  const [data, setData] = useState([]);
  const [dataSlide, setDataSlide] = useState([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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
    <View style={styles.container}>
      <View>
        <HeaderBar navigation={navigation} />
        <View style={styles.containerViewIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Daftar Penyakit')}>
            <Image style={{ width: 120, height: 120 }} source={penyakit} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Daftar Penyakit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Daftar Gejala')} style={{}}>
            <Image style={{ width: 120, height: 120 }} source={gejala} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
              Daftar Gejala
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  containerViewIcon: {
    width: Dimensions.get('window').width,
    height: 130,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMain: {
    // flex: 1,
    flex: 1,
    height: Dimensions.get('window').height - 70,
    // backgroundColor: '#fff',
    backgroundColor: '#003f5c',

    // alignItems: 'center',
    // justifyContent: 'center',
    // marginHorizontal: '25px',
    // marginVertical: '15px',
    // margin: '15px',
  },
});

export default DashboardAdminPage;
