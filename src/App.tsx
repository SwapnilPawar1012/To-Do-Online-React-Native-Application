import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './view/screens/authentication/Login';
import Signup from './view/screens/authentication/Signup';
import Dashboard from './view/screens/Dashboard';
import DrawerNavigation from './DrawerNavigation';
import AuthController from './controller/AuthController';
import {useEffect, useState} from 'react';
import Loading from './view/components/Loading';

export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Signup: undefined;
  DrawerNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const {isAuthenticated, HandleAuthentication} = AuthController();

  useEffect(() => {
    const HandleAuth = async () => {
      await HandleAuthentication(); // Wait for authentication to complete
      setIsLoggedIn(isAuthenticated);
    };
    HandleAuth();
  }, [isAuthenticated]); // Make sure to rerun the effect if isAuthenticated changes

  if (isLoggedIn === null) {
    return <Loading />; // Show loading while checking authentication
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'DrawerNavigation' : 'Dashboard'}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
