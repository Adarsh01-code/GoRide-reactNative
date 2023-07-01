
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Go Mini',
    multiplier: 1.25,
    image: 'https:/links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Go Sedan',
    multiplier: 1.55,
    image: 'https:/links.papareact.com/7pf',
  },
  {
    id: 'Uber-LUX-123',
    title: 'Go SUV',
    multiplier: 2.2,
    image: 'https:/links.papareact.com/5w8',
  },
];

const SURGE_CHARGE_RATE = 16;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (showAlert) {
      timeoutId = setTimeout(() => {
        closeModal();
        // Redirect to HomeScreen
        navigation.navigate('HomeScreen');
      }, 1800);
    }

    return () => clearTimeout(timeoutId);
  }, [showAlert]);

  const handleSwipe = () => {
    setShowAlert(true);
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center py-3 text-xl border-t border-b border-gray-200 font-bold`}>
          Distance - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-300'}`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />

            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format((travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100)}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        {selected && (
          <TouchableOpacity
            disabled={!selected}
            onPress={handleSwipe}
            style={tw`bg-gray-900 py-3 m-3 ${!selected && 'bg-gray-300'}`}
          >
            <View style={tw`flex-row items-center justify-center `}>
              <Image
                source={{ uri: selected.image }}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
              <Text style={tw`text-center text-white text-xl font-normal`}>Choose {selected?.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        isVisible={showAlert}
        onBackdropPress={closeModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        backdropColor="#000"
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <AntDesign name="check" size={36} color="green" style={styles.checkIcon} />
          <Text style={styles.alertText}>Your ride is on the way!</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
});

export default RideOptionsCard;

