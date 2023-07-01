import React from 'react';
import {  Text, View , KeyboardAvoidingView} from 'react-native';
import { Provider } from 'react-redux';
import {store} from './store';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import NavigateCard from './components/NavigateCard';
import RideOptionsCard from './components/RideOptionsCard';
import Login from './screens/Login';


export default function App() {

  const Stack=createStackNavigator();


  return (
    <Provider store={store} >
      <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios'? -64 : 0}
            >
            <Stack.Navigator>


            <Stack.Screen 
              name="Login"
              component={Login}
              options={{
                headerShown:false,
              }}
              />

              <Stack.Screen 
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown:false,
              }}
              />
              <Stack.Screen 
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown:false,
              }}
              />

          

            </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>    
      </NavigationContainer>
    </Provider>
  );
}

