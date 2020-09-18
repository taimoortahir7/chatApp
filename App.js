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
// import { Provider as PaperProvider } from 'react-native-paper';
// import SplashScreen from 'react-native-splash-screen';

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import ReduxThunk from "redux-thunk";

// import projectsReducer from './store/reducers/projects';
// import tasksReducer from './store/reducers/tasks';
// import authReducer from './store/reducers/auth';

import { primaryColor } from './assets/colors';

// import Signin from './screens/signin-page/signin-page';
// import ForgotPassword from './screens/forgot-password-page/forgot-password-page';
// import Projects from './screens/projects-page/projects-page';
// import Settings from './screens/settings/settings';
// import PrivacyPolicy from './screens/privacy-policy-page/privacy-policy-page';
// import SecurityPolicy from './screens/security-policy-page/security-policy-page';
// import TermsService from './screens/terms-service-page/terms-service-page';
// import Tasks from './screens/tasks-page/tasks-page';
import Chat from './src/screens/chat-page/chat-page';
import Login from './src/screens/phone-login-page/phone-login-page';
import PhoneCode from './src/screens/phone-code-page/phone-code-page';
import OnBoarding from './src/screens/onboarding-page/onboarding-page';
import Home from './src/screens/home-page/home-page';
import Contacts from './src/screens/contacts-page/contacts-page';
// import AddView from './shared/add-view';

// const rootReducer = combineReducers({
//   projects: projectsReducer,
//   tasks: tasksReducer,
//   auth: authReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
    // <Provider store={store}>
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
          {/* <Stack.Screen name='Signin' component={Signin}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
          <Stack.Screen name='OnBoarding' component={OnBoarding}/>
          <Stack.Screen name='Projects' component={Projects}/>
          <Stack.Screen name='Settings' component={Settings}/>
          <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}
          options={() => ({
            headerTitle: 'Privacy Policy',
            headerShown: true
          })}/>
          <Stack.Screen name='SecurityPolicy' component={SecurityPolicy}
          options={() => ({
            headerTitle: 'Security Policy',
            headerShown: true
          })}/>
          <Stack.Screen name='TermsService' component={TermsService}
          options={() => ({
            headerTitle: 'Terms & Conditions',
            headerShown: true
          })}/>
          <Stack.Screen name='Tasks' component={Tasks}
          options={({ route }) => ({
            headerShown: true,
            headerBackTitle: 'Projects',
            headerRight: (props) => {
              return <AddView
                type='task'
                projectName={route?.params?.projectName}
                projectID={route?.params?.projectID}
                doneFunc={route?.params?.addTask}
              />
            },
          })}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    // </Provider>
  );
};

export default App;