import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from './../LoginPage/LoginPage';
import DaftarUserPage from './../DaftarUserPage/DaftarUserPage';
import StartPage from './../StartPage/StartPage';
import LoginAdminPage from './../LoginAdminPage/LoginAdminPage';
import CustomDrawerContent from './../../components/CustomDrawerContent';

function DrawerStartPage() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Start"
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
        openByDefault={false}
      >
        <Drawer.Screen name="Start" component={StartPage} />
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Login Admin" component={LoginAdminPage} />
        <Drawer.Screen name="Daftar User" component={DaftarUserPage} />
      </Drawer.Navigator>
    </>
  );
}

export default DrawerStartPage;
