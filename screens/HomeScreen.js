


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Keyboard, Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch , useSelector} from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import Map from '../components/Map';
import { Icon } from 'react-native-elements';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const [showFooter, setShowFooter] = useState(true);
  // const actions = bindActionCreators({ setFirstName }, dispatch);
  // const userFirstName = useSelector(firstName);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowFooter(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowFooter(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/GoRideLogo.png')} />
      </View>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder="From Where?"
          styles={styles.autocomplete}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />
      </View>
      {showFooter && (
        <>
          <View style={styles.optionsContainer}>
            <NavOptions />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Icon name="home" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="briefcase" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={styles.buttonText}>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Icon name="location-sharp" type="ionicon" size={26} color="#5b5b5b" />
              <Text style={styles.buttonText}>Live Location</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {showFooter && (
        <View style={styles.footerContainer}>
          <View style={styles.footerBorder} />
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>Welcome to GoRide </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
   
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 45,
    justifyContent: 'center',
    height: '33.333%',
    backgroundColor: '#EDF2F7',
    marginBottom: 30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  logo: {
    width: 320,
    height: 250,
    resizeMode: 'contain',
  },
  inputContainer: {
    // paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  autocomplete: {
    container: {
      flex: 0,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderColor: '#EDF2F7',
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      margin: 20,
      elevation: 1.5,
      overflow: 'hidden',
    },
    textInput: {
      fontSize: 18,
    },
    separator: {
      height: 0.7,
     
    },
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth:1,
    borderColor:'#d1d5db'
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 44,
  },
  buttonText: {
    color: 'black',
    marginTop: 5,
    fontSize: 12,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  footerContainer: {
    backgroundColor: 'white',
    marginBottom:10
  },
  footerBorder: {
    borderTopWidth: 1,
    borderColor: '#d1d5db',
  },
  footerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 15,
    fontWeight:300
  },
});

export default HomeScreen;
