import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import gambar from './../assets/iguanah.png';

const HeaderBar = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ backgroundColor: 'white' }}>
        <NavigationDrawerStructure navigationProps={navigation} />
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Sistem Pakar Diagnosa</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Penyakit Hewan Iguana</Text>
      </View>
      <View style={{ marginRight: 5 }}>
        <Image style={{ width: 80, height: 80 }} source={gambar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: 'white', //Set Header color
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    height: 150,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});

export default HeaderBar;
