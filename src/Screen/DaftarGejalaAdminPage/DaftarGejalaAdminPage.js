import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import HeaderBar from '../../components/HeaderBar';
import CardAdminPenyakit from '../../components/CardAdminPenyakit';
import CardFullGejala from '../../components/CardFullGejala';
import NavigationDrawerStructure from '../../components/NavigationDrawerStructure';
import TambahGejalaPage from '../TambahGejalaPage/TambahGejalaPage';
import EditGejalaPage from '../EditGejalaPage/EditGejalaPage';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import gambar from './../../assets/iguanah.png';
import { useContextValue } from '../../context/context';
import { useIsFocused } from '@react-navigation/native';

const DaftarGejalaComponent = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [{ api }] = useContextValue();
  const [penyakit, setpenyakit] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/get_gejala_join`)
      .then((res) => {
        setpenyakit(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {penyakit.map((el, i) => (
          <CardFullGejala
            key={i}
            navigation={navigation}
            nama={el.nama}
            gejala={el.desc_gejala}
            id_penyakit={el.id_penyakit}
            id_gejala={el.id_gejala}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => navigation.navigate('Tambah Gejala')}
      >
        <Entypo name="plus" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const DaftarGejalaAdminPage = ({ navigation }) => {
  const Stack = createStackNavigator();
  const [{ api }] = useContextValue();
  const [penyakit, setpenyakit] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get(`${api}/get_gejala_join`)
      .then((res) => {
        setpenyakit(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFocused]);

  return (
    <Stack.Navigator initialRouteName="Daftar Gejala">
      <Stack.Screen
        name="Daftar Gejala"
        component={DaftarGejalaComponent}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerRight: () => (
            <Image style={{ width: 80, height: 80, marginRight: 20 }} source={gambar} />
          ),
          headerStyle: {
            backgroundColor: '#fff',
            height: 150,
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
      <Stack.Screen
        name="EditGejala"
        component={EditGejalaPage}
        options={{
          title: 'Edit Gejala', //Set Header Title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate('Daftar Gejala', {
                  screen: 'Daftar Gejala',
                })
              }
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },

          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Tambah Gejala"
        component={TambahGejalaPage}
        options={{
          title: 'Tambah Gejala', //Set Header Title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate('Daftar Gejala', {
                  screen: 'Daftar Gejala',
                })
              }
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },

          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
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
    position: 'relative',
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 55,
    right: 30,
    backgroundColor: '#59A96A',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
});
export default DaftarGejalaAdminPage;
