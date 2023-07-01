


// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import React from 'react'
// import Map from '../components/Map'
// import tw from 'tailwind-react-native-classnames'
// import MapView from 'react-native-maps'
// import { createStackNavigator } from '@react-navigation/stack'
// import NavigateCard from '../components/NavigateCard'
// import RideOptionsCard from '../components/RideOptionsCard'
// import { useNavigation } from '@react-navigation/native'
// import { Icon } from 'react-native-elements/dist/icons/Icon'


// const MapScreen = () => {
//   const Stack = createStackNavigator();
//   const navigation=useNavigation();


//   return (
//     <View>

//       <TouchableOpacity
//         style={tw`bg-gray-200 absolute top-12 left-5 z-50 p-3 rounded-full `}
//         onPress={() => navigation.navigate("HomeScreen")}>
//           <Icon name="home" />
//       </TouchableOpacity>


//       <View style={tw`h-1/2`}>
//         <Map />
//       </View>

//       <View style={tw`h-1/2`}>
//         <Stack.Navigator>

//           <Stack.Screen 
//           name="NavigateCard"
//           component={NavigateCard}
//           options={{
//             headerShown:false,
//           }}
//           />

//           <Stack.Screen 
//           name="RideOptionsCard"
//           component={RideOptionsCard}
//           options={{
//             headerShown:false,
//           }}
//           />

//         </Stack.Navigator>

//       </View>
//     </View>
//   )
// }

// export default MapScreen

// const styles = StyleSheet.create({})



import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Map from '../components/Map';
import tw from 'tailwind-react-native-classnames';
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const { height } = Dimensions.get('window');

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tw`bg-gray-200 absolute top-12 left-5 z-50 p-3 rounded-full `}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Icon name="home" />
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <Map />
      </View>

      <View style={styles.cardsContainer}>
        <Stack.Navigator>
          <Stack.Screen name="NavigateCard" component={NavigateCard} options={{ headerShown: false }} />
          <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex:-10,
  },
  mapContainer: {
    flex: 0.60,
  },
  cardsContainer: {
    flex: 0.40,
  },
});

export default MapScreen;
