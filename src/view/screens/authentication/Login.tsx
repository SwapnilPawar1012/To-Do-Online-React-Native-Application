import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import AuthController from '../../../controller/AuthController';

type LoginProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login = ({navigation}: LoginProps) => {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {HandleLogin} = AuthController();

  const HandleOnSubmit = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    const user = {email, password};
    const response = await HandleLogin(user);

    if (response!.success) {
      console.log('Login successful: ', response);
      navigation.navigate('DrawerNavigation');
    } else {
      console.log('Signup Failed: ', response?.error);
      setError(response!.error || 'SingupFailed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={email}
          placeholder="Email"
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          value={password}
          placeholder="Password"
          style={styles.inputField}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {error ? (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={HandleOnSubmit}>
          <View style={styles.btnBox}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.navigationBox}>
          <Text style={styles.navigationText}>Don't have an account, </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.navigationBtnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 30,
  },
  inputBox: {
    marginVertical: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#999',
    fontSize: 18,
    borderRadius: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 13,
    color: 'red',
    marginLeft: 4,
  },
  btnContainer: {
    marginVertical: 15,
  },
  btnBox: {
    backgroundColor: '#348ce3',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  navigationBox: {
    marginTop: 10,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  navigationText: {
    fontSize: 16,
    textAlignVertical: 'center',
  },
  navigationBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#348ce3',
  },
});

export default Login;
