import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BantuanPage from './../BantuanPage/BantuanPage';
import AboutPage from './../AboutPage/AboutPage';
import DashboardAdminPage from './../DashboardAdminPage/DashboardAdminPage';
import DaftarGejalaAdminPage from './../DaftarGejalaAdminPage/DaftarGejalaAdminPage';
import DaftarPenyakitAdminPage from './../DaftarPenyakitAdminPage/DaftarPenyakitAdminPage';
import CustomDrawerContentAdmin from './../../components/CustomDrawerContentAdmin';

function MainAdminPage() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContentAdmin {...props} />}
      >
        <Drawer.Screen name="Home" component={DashboardAdminPage} />
        <Drawer.Screen name="Daftar Penyakit" component={DaftarPenyakitAdminPage} />
        <Drawer.Screen name="Daftar Gejala" component={DaftarGejalaAdminPage} />
        <Drawer.Screen name="About" component={AboutPage} />
        <Drawer.Screen name="Bantuan" component={BantuanPage} />
      </Drawer.Navigator>
    </>
  );
}

export default MainAdminPage;
