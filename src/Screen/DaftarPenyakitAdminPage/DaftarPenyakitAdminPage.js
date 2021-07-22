import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import HeaderBar from './../../components/HeaderBar';
import CardAdminPenyakit from './../../components/CardAdminPenyakit';
import NavigationDrawerStructure from './../../components/NavigationDrawerStructure';
import TambahPenyakitPage from './../TambahPenyakitPage/TambahPenyakitPage';
import EditPenyakitPage from './../EditPenyakitPage/EditPenyakitPage';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import gambar from './../../assets/iguanah.png';
import { useContextValue } from './../../context/context';
import { useIsFocused } from '@react-navigation/native';

const DaftarPenyakitAdminComponent = ({ navigation }) => {
  const [{ api }] = useContextValue();
  const [penyakit, setpenyakit] = useState([]);
  const [load, setLoad] = useState(false);
  const isFocused = useIsFocused();

  let req = async () => {
    setLoad(true);
    await axios
      .get(`${api}/get_penyakit`)
      .then((res) => {
        setpenyakit(res.data.results);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    req();
  }, [isFocused]);

  return (
    <>
      {load ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            {penyakit.map((el, i) => (
              <CardAdminPenyakit
                key={i}
                navigation={navigation}
                nama={el.nama}
                id={el.id_penyakit}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => navigation.navigate('Tambah Penyakit')}
          >
            <Entypo name="plus" size={50} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const DaftarPenyakitAdminPage = ({ navigation }) => {
  const Stack = createStackNavigator();
  const [{ api }] = useContextValue();
  const [penyakit, setpenyakit] = useState([]);
  const [load, setLoad] = useState(false);
  const isFocused = useIsFocused();

  let req = async () => {
    setLoad(true);
    await axios
      .get(`${api}/get_penyakit`)
      .then((res) => {
        setpenyakit(res.data.results);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    req();
  }, [isFocused]);

  return (
    <Stack.Navigator initialRouteName="Daftar Penyakit">
      <Stack.Screen
        name="Daftar Penyakit"
        component={DaftarPenyakitAdminComponent}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerRight: () => (
            <Image style={{ width: 80, height: 80, marginRight: 20 }} source={gambar} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
            height: 150,
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          },
          headerTintColor: 'black',
          headerTitle: () => (
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Daftar Penyakit</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditPenyakitPage}
        options={{
          title: 'Edit Penyakit', //Set Header Title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate('Daftar Penyakit', {
                  screen: 'Daftar Penyakit',
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
        name="Tambah Penyakit"
        component={TambahPenyakitPage}
        options={{
          title: 'Tambah Penyakit', //Set Header Title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate('Daftar Penyakit', {
                  screen: 'Daftar Penyakit',
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BDEAC',
  },
});
export default DaftarPenyakitAdminPage;
