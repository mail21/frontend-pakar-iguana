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

const AboutPage = ({ navigation }) => {
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
      <ScrollView>
        <HeaderBar navigation={navigation} />
        <Text>Aplikasi Ini dibuat Oleh Fajri Mardani</Text>
      </ScrollView>
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
});

export default AboutPage;
