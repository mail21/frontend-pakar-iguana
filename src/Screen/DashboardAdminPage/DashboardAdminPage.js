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
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from '../../components/NavigationDrawerStructure';
import gambar from './../../assets/iguanah.png';

const DashboardAdminPage = ({ navigation }) => {
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
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen
        name="About"
        component={() => (
          <View style={styles.container}>
            <View>
              <View style={styles.containerViewIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('Daftar Penyakit')}>
                  <Image style={{ width: 120, height: 120 }} source={penyakit} />
                  <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
                    Daftar Penyakit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Daftar Gejala')}
                  style={{}}
                >
                  <Image style={{ width: 120, height: 120 }} source={gejala} />
                  <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
                    Daftar Gejala
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sistem Pakar Diagnosa</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Penyakit Hewan Iguana</Text>
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
