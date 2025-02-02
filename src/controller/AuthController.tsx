import {useState} from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthController = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentUserToken, setCurrentUserToken] = useState<string>('');

  const URI = 'http://10.0.2.2:3000/user-api';

  const HandleLogin = async (user: any) => {
    try {
      const response = await axios.post(`${URI}/login`, user);

      if (response.status === 200) {
        console.log('user: ', response.data);
        // setCurrentUser(response.data._id);
      }

      const token = response.data.token;
      if (!token) {
        console.log('Something is Wrong, Please try again');
        return;
      }

      // Store token in AsyncStorage
      await AsyncStorage.setItem('jwtToken', token);

      return response.status === 200
        ? {
            success: true,
            message: 'User logged in successful',
          }
        : {success: false, error: 'Failed to Login'};
    } catch (error: any) {
      console.error('Login Failed');
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  };

  const HandleSignup = async (user: any) => {
    try {
      const response = await axios.post(`${URI}/signup`, user);

      const token = response.data.token;
      if (!token) {
        console.log('Something is wrong, Account Created but Login Failed');
        return {success: false, error: 'Token missing'};
      }

      await AsyncStorage.setItem('jwtToken', token);
      return {success: true, token, user: response.data.user};
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Signup failed',
      };
    }
  };

  const HandleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    setCurrentUserToken('');
    setIsAuthenticated(false);
  };

  const HandleAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      if (!token) {
        console.error('Something is Wrong, User is not Authenticated');
        return;
      }

      // Decode the token to extract user information
      const decodedToken: any = await jwtDecode(token);

      console.log('Decoded Token: ', decodedToken);

      // Assuming the userId is in the token's payload
      const userId = decodedToken.userId;

      setIsAuthenticated(true);
      setCurrentUser(userId);
      setCurrentUserToken(token);

      return {token, userId};
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  return {
    currentUser,
    currentUserToken,
    isAuthenticated,
    HandleLogin,
    HandleSignup,
    HandleAuthentication,
    HandleLogout,
  };
};

export default AuthController;
