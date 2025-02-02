import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from './view/screens/Home';
import CustomDrawerContent from './view/components/CustomDrawerContent';
import Profile from './view/screens/Profile';
import AddTask from './view/screens/AddTask';
import UpdateTask from './view/screens/UpdateTask';
import {RefreshProvider} from './controller/context/useRefresh';

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  AddTask: undefined;
  UpdateTask: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigation = () => {
  return (
    <RefreshProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({}) => (
              <FontAwesome name="user-circle" size={24} color="#6e99ff" />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'To Do List',
            headerTitleAlign: 'center',
            drawerIcon: ({}) => (
              <FontAwesome name="list" size={18} color={'#6e99ff'} />
            ),
          }}
        />
        <Drawer.Screen
          name="AddTask"
          component={AddTask}
          options={{
            title: 'Add Task',
            headerTitleAlign: 'center',
            drawerIcon: ({}) => (
              <FontAwesome name="tasks" size={18} color={'#6e99ff'} />
            ),
          }}
        />
        <Drawer.Screen
          name="UpdateTask"
          component={UpdateTask}
          options={{
            title: 'Update Task',
            headerTitleAlign: 'center',
            drawerItemStyle: {display: 'none'}, // Hides the item from the drawer
          }}
        />
      </Drawer.Navigator>
    </RefreshProvider>
  );
};

export default DrawerNavigation;
