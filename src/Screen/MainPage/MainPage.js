import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BantuanPage from './../BantuanPage/BantuanPage';
import AboutPage from './../AboutPage/AboutPage';
import DashboardPage from './../DashboardPage/DashboardPage';
import CustomDrawerContent from './../../components/CustomDrawerContent';

function MainPage() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={DashboardPage} />
        <Drawer.Screen name="Daftar Penyakit" component={AboutPage} />
        <Drawer.Screen name="About" component={AboutPage} />
        <Drawer.Screen name="Bantuan" component={BantuanPage} />
      </Drawer.Navigator>
    </>
  );
}

export default MainPage;
