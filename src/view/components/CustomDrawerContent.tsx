import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AuthController from '../../controller/AuthController';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomDrawerContent = (props: any) => {
  const {HandleLogout} = AuthController();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        icon={({}) => <FontAwesome name="sign-out" size={18} color="#eb0909" />}
        onPress={() => {
          HandleLogout();
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          });
        }}
      />
      <DrawerItem
        label="Clone Drawer"
        icon={({}) => (
          <FontAwesome name="times-circle" size={18} color="black" />
        )}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle Drawer"
        icon={({}) => <FontAwesome name="bars" size={18} color="black" />}
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
