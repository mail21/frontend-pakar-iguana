import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BantuanPage from './../BantuanPage/BantuanPage';
import DaftarPenyakitPage from './../DaftarPenyakitPage/DaftarPenyakitPage';
import AboutPage from './../AboutPage/AboutPage';
import DashboardPage from './../DashboardPage/DashboardPage';
import KonsultasiPage from './../KonsultasiPage/KonsultasiPage';
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
        <Drawer.Screen name="About" component={AboutPage} />
        <Drawer.Screen name="Bantuan" component={BantuanPage} />
        <Drawer.Screen name="Daftar Penyakit" component={DaftarPenyakitPage} />
        <Drawer.Screen name="Konsultasi" component={KonsultasiPage} />
      </Drawer.Navigator>
    </>
  );
}

export default MainPage;
