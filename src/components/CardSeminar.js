import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardSeminar = ({ navigationProps, nama, tanggal, no, deskripsi, jenis }) => {
  const handlePress = (id) => {
    navigationProps.navigate('Detail Event', {
      no_event: id,
      otherParam: 'anything you want here',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(no)}>
      <View style={styles.cardBody}>
        <Text style={styles.badgeCard}>{jenis}</Text>
        <Text numberOfLines={1} style={styles.nama}>
          {nama}
        </Text>
        <Text style={styles.tanggal}>{tanggal}</Text>
        <Text numberOfLines={6} style={{ marginTop: 10 }}>
          {deskripsi}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    // wordWrap: 'break-word',
    backgroundColor: '#fff',
    borderRadius: 7,
    marginVertical: 15,
    marginHorizontal: 20,
    // boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  cardBody: {
    flex: 1,
    minHeight: 1,
    padding: 20,
  },

  badgeCard: {
    fontWeight: '700',
    textAlign: 'center',
    // whiteSpace: 'nowrap',
    // verticalAlign: 'baseline',
    borderRadius: 7,
    color: '#fff',
    backgroundColor: '#6c757d',
    marginBottom: 10,
    padding: 2,
    width: '30%',
    fontSize: 11,
  },

  nama: {
    // display: 'block',
    fontWeight: '700',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  tanggal: {
    color: '#6c757d',
    // display: 'block',
  },
});

export default CardSeminar;
