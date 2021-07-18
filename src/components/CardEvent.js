import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Clipboard,
  Linking,
} from 'react-native';

// import { FileSystem } from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import { Constants, FileSystem } from 'expo';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
// import * as Permissions from 'expo-permissions';
import * as Print from 'expo-print';

import { makePDF, toDataURL } from './../controllers/controllerPdfImage';
import { useContextValue } from './../context/context';

export default function CardEvent({
  nama_event,
  no_tagihan,
  harga_tiket,
  tanggal_bayar,
  channel_bayar,
  tempat_bayar,
  status_bayar,
  no_event,
}) {
  const [{ api, user }, dispatch] = useContextValue();

  const [toggle, setToggle] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const toggleArrow = () => {
    setToggle(!toggle);
  };

  const handlePressCopy = (noTagihan) => {
    ToastAndroid.show(`copy text ${noTagihan}`, ToastAndroid.SHORT);
    Clipboard.setString(noTagihan);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  };

  const handlePressCetakTiket = async () => {
    const downloadFile = (konten) => {
      const uri = `${api}/downloadTiket/${no_event}/${user.username}`;
      let fileUri = FileSystem.documentDirectory + 'tiket.pdf';
      FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          saveFile(uri);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    downloadFile();
    // window.location.href = `${api}/download/${no_event}/${user.username}`;

    const saveFile = async (fileUri) => {
      // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const location = await MediaLibrary.createAlbumAsync('Download', asset, false);

      ToastAndroid.show(`Finished downloading to Picture/Download Folder`, ToastAndroid.SHORT);
      // }
    };
  };

  const handlePressCetakSertifikat = async () => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
              font-size: 16px;
              color: rgb(255, 196, 0);
              width: 21cm;
              height: 29.7cm;
              background-image: url('${'https://i.ibb.co/g6MCFdK/sertif-pelatihan-data.png'}');
              margin: 0;
              padding : 0;
           }

            h1 {
                text-align: center;
            }

              @page {size: landscape}
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
`;

    const createPDF = async (html) => {
      try {
        const { uri } = await Print.printToFileAsync({ html });
        return uri;
      } catch (err) {
        console.error(err);
      }
    };

    const downloadFile = (konten) => {
      // const uri = 'http://techslides.com/demos/sample-videos/small.mp4';
      // const uri = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      const uri = `${api}/download/${no_event}/${user.username}`;
      // const uri = createPDF(konten);
      let fileUri = FileSystem.documentDirectory + 'seminar.pdf';
      // Expected URL scheme 'http' or 'https' but was 'file'
      FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          saveFile(uri);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    downloadFile();
    // window.location.href = `${api}/download/${no_event}/${user.username}`;

    const saveFile = async (fileUri) => {
      // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const location = await MediaLibrary.createAlbumAsync('Download', asset, false);

      ToastAndroid.show(`Finished downloading to Picture/Download Folder`, ToastAndroid.SHORT);
      console.log('done to', fileUri);
      // }
    };

    // downloadFile(htmlContent);
    // const createAndSavePDF = async (html) => {
    //   try {
    //     const { uri } = await Print.printToFileAsync({ html });

    //     saveFile(uri);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // createAndSavePDF(htmlContent);
  };

  return (
    <View style={styles.containerCard}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Text>1</Text>
        <Text numberOfLines={1} style={{ marginHorizontal: 10 }}>
          {nama_event}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginVertical: 5,
        }}
      />
      <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
        <View>
          <Text>No Tagihan</Text>
          <Text>Jumlah Tagihan</Text>
          <Text>Status</Text>
          <Text>Tanggal Bayar</Text>
          <Text>Tempat Bayar</Text>
          <Text>Channel</Text>
        </View>
        <View style={{ marginLeft: 7 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ marginRight: 8 }}>: {no_tagihan}</Text>
            <TouchableOpacity onPress={() => (no_tagihan ? handlePressCopy(no_tagihan) : '')}>
              <MaterialCommunityIcons name="content-copy" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* <Text>: Rp. {harga_tiket}</Text> */}
          <Text>
          </Text>

          <Text
            style={status_bayar === 'lunas' ? { color: 'lightgreen' } : { color: 'orange' }}
          >
            : {status_bayar}
          </Text>
          <Text>: {tanggal_bayar ? tanggal_bayar : ' -'}</Text>
          <Text>: {channel_bayar ? channel_bayar : ' -'}</Text>
          <Text>: {tempat_bayar ? tempat_bayar : ' -'}</Text>
        </View>
      </View>
      {toggle ? (
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 5,
            backgroundColor: '#ececec',
            marginVertical: 8,
          }}
          onPress={toggleArrow}
        >
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          {/* <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> */}
        </TouchableOpacity>
      ) : (
        <View>
          <View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical: 5,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#ececec',
                  flex: 1,
                  alignItems: 'center',
                  padding: 7,
                  margin: 4,
                }}
                onPress={handlePressCetakSertifikat}
              >
                <Zocial name="print" size={24} color="black" />
                <Text>Cetak Sertifikat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ececec',
                  flex: 1,
                  alignItems: 'center',
                  padding: 7,
                  margin: 4,
                }}
                onPress={handlePressCetakTiket}
              >
                <Zocial name="print" size={24} color="black" />
                <Text>Cetak Tiket</Text>
              </TouchableOpacity>
            </View>
            {/* <Button title="Upload" onPress={pickImage} /> */}
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#ececec',
              marginTop: 18,
            }}
            onPress={toggleArrow}
          >
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
