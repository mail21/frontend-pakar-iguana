import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Linking, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { NavigationActions } from 'react-navigation';
import { useContextValue } from './../context/context';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  const navigateToScreen = (route) => () => {
    // const navigateAction = NavigationActions.navigate({
    //   routeName: route,
    // });
    // props.navigation.dispatch(navigateAction);
  };
  // useEffect(() => {
  //   console.log(props);
  // }, [props]);
  const [context, dispatch] = useContextValue();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', color: 'white' }}>
      <View style={styles.containerStatusSidebar}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sistem Pakar</Text>
        <Text style={styles.textSidebar}>Penyakit Iguana</Text>
      </View>
      <DrawerContentScrollView {...props} style={{ color: 'black' }}>
        <DrawerItem
          focused={props.state.index === 0 ? true : false}
          icon={() => <FontAwesome name="home" size={24} color="black" />}
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          activeTintColor="#9BDEAC"
          inactiveTintColor="black"
        />
        {/* <DrawerItem
          focused={props.state.index === 1 ? true : false}
          icon={() => <AntDesign name="search1" size={24} color="black" />}
          label="Daftar Penyakit"
          onPress={() => props.navigation.navigate('Daftar Penyakit')}
          activeTintColor="#9BDEAC"
          inactiveTintColor="black"
        /> */}
        <DrawerItem
          focused={props.state.index === 1 ? true : false}
          icon={() => <Entypo name="light-bulb" size={24} color="black" />}
          label="Tentang"
          onPress={() => props.navigation.navigate('About')}
          activeTintColor="#9BDEAC"
          inactiveTintColor="black"
        />
        <DrawerItem
          focused={props.state.index === 2 ? true : false}
          icon={() => <Entypo name="help-with-circle" size={24} color="black" />}
          label="Bantuan"
          onPress={() => props.navigation.navigate('Bantuan')}
          activeTintColor="#9BDEAC"
          inactiveTintColor="black"
        />
        <DrawerItem
          icon={() => <AntDesign name="logout" size={24} color="black" />}
          label="Keluar"
          onPress={() => {
            props.navigation.navigate('Start');
            dispatch({ type: 'SIGN_OUT' });
          }}
          activeTintColor="#9BDEAC"
          inactiveTintColor="black"
        />
      </DrawerContentScrollView>

      {/* <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
        www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStatusSidebar: {
    // marginTop: 40,
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textSidebar: {
    // color: 'white',
    // fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default CustomDrawerContent;
