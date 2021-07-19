import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CardEvent from './../../components/CardEvent';
import { useContextValue } from './../../context/context';
import axios from 'axios';

const EventComponent = () => {
  const [{ api, load, user }, dispatch] = useContextValue();
  const [data, setData] = useState([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${api}/history-events/${user.username}`, { params: { page: currentPage } })
      .then((res) => {
        setData(res.data.results.data);
        setPageTotal(res.data.results.last_page);
        setCurrentPage(res.data.results.current_page);
        // console.log(res.data.resultsSlide);
        // setload(!load);
      });
  }, []);

  return (
    <View style={styles.container}>
      {load ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView>
          {data.map((el, i) => (
            <CardEvent
              key={i}
              nama_event={el.nama_event}
              status_bayar={el.status_bayar}
              tanggal_bayar={el.tanggal_bayar}
              tempat_bayar={el.tempat_bayar}
              channel_bayar={el.channel_bayar}
              status_bayar={el.status_bayar}
              harga_tiket={el.harga_tiket}
              no_event={el.no_event}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 70,
    padding: 10,
    backgroundColor: '#003f5c',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EventComponent;
