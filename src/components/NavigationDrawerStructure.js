import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import menu from './../image/menu.png';

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image source={menu} style={{ width: 25, height: 25, marginLeft: 25 }} />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationDrawerStructure;
