

//wprking code

// import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from 'react-native';
// import React from 'react';
// import tw from 'tailwind-react-native-classnames';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GOOGLE_MAPS_APIKEY } from "@env";
// import { setDestination } from '../slices/navSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-elements';

// const NavigateCard = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={tw`bg-white flex-1 border-t border-gray-300`}>
//       <View style={[tw`flex-1`,styles.navigateCard]}>
//         <View style={tw`p-5`}>
//           <Text style={tw`text-xl font-semibold`}>Select your Destination, Adarsh</Text>
//           <View style={tw`mt-2`}>
//             <GooglePlacesAutocomplete
//               placeholder='Where To?'
//               styles={toInputBoxStyles}
//               fetchDetails={true}
//               returnKeyType={"search"}
//               minLength={2}
//               onPress={(data, details = null) => {
//                 dispatch(setDestination({
//                   location: details.geometry.location,
//                   description: data.description,
//                 }));
//                 navigation.navigate("RideOptionsCard");
//               }}
//               enablePoweredByContainer={false}
//               query={{
//                 key: GOOGLE_MAPS_APIKEY,
//                 language: "en",
//               }}
//               nearbyPlacesAPI='GooglePlacesSearch'
//               debounce={400}
//             />
//           </View>
//         </View>
//         <View style={styles.footer}>
//             <TouchableOpacity>
//           <View style={styles.footerItem}>
//             <Icon name="home" type="ionicon" size={26} color="#5b5b5b" />
//             <Text style={tw`mt-1 text-xs text-gray-600`}>Home</Text>
//           </View>
//           </TouchableOpacity>

//           <TouchableOpacity>
//           <View style={styles.footerItem}>
//             <Icon name="briefcase" type="ionicon" size={26} color="#5b5b5b" />
//             <Text style={tw`mt-1 text-xs text-gray-600`}>Work</Text>
//           </View>
//           </TouchableOpacity>

//           <TouchableOpacity>
//           <View style={styles.footerItem}>
//             <Icon name="location-sharp" type="ionicon" size={26} color="#5b5b5b" />
//             <Text style={tw`mt-1 text-xs text-gray-600`}>Live Location</Text>
//           </View>
//           </TouchableOpacity>
         
//         </View>
        
//       </View>
//     </SafeAreaView>
//   );
// }



// const styles = StyleSheet.create({
//     navigateCard: {
//       flex: 1,
//       backgroundColor: 'white',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       marginBottom: 10,
//     },
//     footer: {
//       flexDirection: 'column',
//       alignItems: 'center',
//       paddingVertical: 10,
//       backgroundColor: 'white',
//     },
//     footerItem: {
//       alignItems: 'center',
//       marginVertical: 5,
//     },
//   });
  

// const toInputBoxStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     paddingTop: 25,
//     flex: 0,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   textInput: {
//     backgroundColor: "#DDDDDF",
//     borderRadius: 10,
//     fontSize: 18,
//   },
//   textInputContainer: {
//     paddingBottom: 0,
//   },
// });

// export default NavigateCard;





import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 border-t border-gray-300`}>
      <View style={[tw`flex-1`, styles.navigateCard]}>
        <View style={tw`p-5`}>
          <Text style={tw`text-xl ml-8  font-semibold`}>Select your Destination, Adarsh</Text>
          <View style={tw`mt-2`}>
            <GooglePlacesAutocomplete
              placeholder='Where To?'
              styles={toInputBoxStyles}
              fetchDetails={true}
              returnKeyType={"search"}
              minLength={2}
              onPress={(data, details = null) => {
                dispatch(setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }));
                navigation.navigate("RideOptionsCard");
              }}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="home" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={tw`mt-1 text-xs text-gray-600 ml-2`}>Home Address</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="briefcase" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={tw`mt-1 text-xs text-gray-600 ml-2`}>Work Address</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.footerItem}>
              <Icon name="location-sharp" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={tw`mt-1 text-xs text-gray-600 ml-2`}>Live Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigateCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20,
  },
});

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 25,
    flex: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 10,
    fontSize: 18,
    elevation:2,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});

export default NavigateCard;
