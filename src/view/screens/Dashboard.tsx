import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type DashboardProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const Dashboard = ({navigation}: DashboardProps) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/to-do.png')} style={styles.logo} />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={styles.btnBox}>
            <Text style={styles.btnText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View style={styles.btnBox}>
            <Text style={styles.btnText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={require('../../assets/notes.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    top: 190,
  },
  btnBox: {
    paddingHorizontal: 130,
    paddingVertical: 18,
    marginVertical: 15,
    backgroundColor: '#348ce3',
    borderRadius: 30,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Dashboard;
