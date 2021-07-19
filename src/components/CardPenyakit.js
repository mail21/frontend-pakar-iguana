import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import { useContextValue } from './../context/context';
export default function CardPenyakit({ navigation, nama, id }) {
  const [{ api }] = useContextValue();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailPenyakit', {
          id_penyakit: id,
        })
      }
    >
      <View>
        <Text style={{ fontSize: 19 }}>{nama}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: Dimensions.get('window').width,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
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
