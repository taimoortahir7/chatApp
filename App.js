/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { Image, TouchableOpacity , Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from './src/store/reducers/auth';

import { primaryColor } from './assets/colors';

import Chat from './src/screens/chat-page/chat-page';
import Login from './src/screens/phone-login-page/phone-login-page';
import PhoneCode from './src/screens/phone-code-page/phone-code-page';
import OnBoarding from './src/screens/onboarding-page/onboarding-page';
import Home from './src/screens/home-page/home-page';
import Contacts from './src/screens/contacts-page/contacts-page';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

const App: () => React$Node = () => {

  const Stack = createStackNavigator();

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='OnBoarding'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='OnBoarding' component={OnBoarding}/>
          <Stack.Screen name='Login' component={Login} 
          options={() => ({
            headerTitle: 'Phone Number',
            headerShown: true,
            headerLeft: null,
            headerStyle: {
              backgroundColor: primaryColor
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'normal',
              fontSize: 20,
              lineHeight: 23
            }
          })}/>
          <Stack.Screen name='PhoneCode' component={PhoneCode} 
          options={() => ({
            headerTitle: 'Security Code',
            headerShown: true,
            headerLeft: null,
            headerStyle: {
              backgroundColor: primaryColor
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'normal',
              fontSize: 20,
              lineHeight: 23
            }
          })}/>
          <Stack.Screen name='Chat' component={Chat}
          options={({ route, navigation }) => ({
            headerTitle: () => (
              <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 30, display: 'flex', flexDirection: 'row' }} onPress={ () => { navigation.goBack() } }>
                <Image source={require('./assets/cross.png')} style={{ marginHorizontal: 20 }}/> 
                <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 20, lineHeight: 23 }}>{route?.params?.name ? route?.params?.name : route?.params?.phone}</Text>
              </TouchableOpacity>
            ),
            headerBackTitle: '',
            headerShown: true,
            headerStyle: {
              backgroundColor: primaryColor
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'normal',
              fontSize: 20,
              lineHeight: 23
            }
          })}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Contacts' component={Contacts}
          options={({ navigation }) => ({
            headerTitle: 'Start New Chat',
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 30 }} onPress={ () => { navigation.goBack() } }>
                <Image source={require('./assets/cross.png')} />   
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: primaryColor
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'normal',
              fontSize: 20,
              lineHeight: 23
            }
          })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;