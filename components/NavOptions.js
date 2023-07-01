


//working code


import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const [slideAnim] = useState(new Animated.Value(0));

  const handlePress = () => {
    if (!origin) return;

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('MapScreen');
    });
  };

  const slideButtonStyle = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [38, 200],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navOption}
        onPress={handlePress}
        disabled={!origin}
      >
        <View style={styles.textContainer}>
          <Text style={styles.getARideText}>Click to GoRide</Text>
          <Animated.View style={[styles.carContainer, slideButtonStyle]}>
            <Image
              style={styles.carIcon}
              source={require('../assets/car-logo.png')}
            />
          </Animated.View>
        </View>
        <View style={styles.slideButton}>
          <Icon name="arrowright" type="antdesign" color="white" style={styles.arrowhead}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D3748',
    width: '90%',
    height: 59,
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 110,
    elevation:2,
  },
  arrowhead:{
    marginTop:14,
    

  },
  navOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  carContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 1,
    paddingTop:13,
  },
  carIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  getARideText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 19,
  },
});

export default NavOptions;




