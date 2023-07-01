//Main Code

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, {Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux';
import {selectOrigin, selectDestination, setTravelTimeInformation} from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env"


const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef= useRef(null);
    const dispatch = useDispatch();
    



    useEffect(() => {
        if (!origin || !destination) return;

        const timeout = setTimeout(() => {
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
        }, 100);

        return () => clearTimeout(timeout);
        }, [origin, destination]);

        useEffect(() => {
            if(!origin || !destination) return;

            
            const getTravelTime = async () => {
                fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}
                `) 
                
                .then((res) => res.json())
                .then(data => {
                        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));

                    
                    
                })
            };
            getTravelTime();

        },[origin, destination,GOOGLE_MAPS_APIKEY]);



    return (
    <MapView 
    ref={mapRef}
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
        latitude:origin.location.lat,
        longitude:origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }}
    >

        {origin && destination && (
            <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor='black'
            
            />
        )}



        {origin?.location && (
            <Marker 
            coordinate={{
                latitude:origin.location.lat,
                longitude:origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
            />
        )}

        {destination?.location && (
            <Marker 
            coordinate={{
                latitude:destination.location.lat,
                longitude:destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
            />
        )}




    </MapView>
  );
};

export default Map

const styles = StyleSheet.create({})


//Map in homescreen code

// import { StyleSheet, View } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import tw from 'tailwind-react-native-classnames';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
// import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLE_MAPS_APIKEY } from "@env";

// const Map = ({ initialLocation }) => {
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination);
//   const mapRef = useRef(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!origin || !destination) return;

//     const timeout = setTimeout(() => {
//       mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
//         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//       });
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [origin, destination]);

//   useEffect(() => {
//     if (!origin || !destination) return;

//     const getTravelTime = async () => {
//       fetch(
//         `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
//         });
//     };

//     getTravelTime();
//   }, [origin, destination, GOOGLE_MAPS_APIKEY]);

//   return (
//     <MapView
//       ref={mapRef}
//       style={tw`flex-1`}
//       mapType="mutedStandard"
//       initialRegion={
//         initialLocation
//           ? {
//               latitude: initialLocation.latitude,
//               longitude: initialLocation.longitude,
//               latitudeDelta: 0.005,
//               longitudeDelta: 0.005,
//             }
//           : null
//       }
//     >
//       {origin && destination && (
//         <MapViewDirections
//           origin={origin.description}
//           destination={destination.description}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={3}
//           strokeColor='black'
//         />
//       )}

//       {origin?.location && (
//         <Marker
//           coordinate={{
//             latitude: origin.location.lat,
//             longitude: origin.location.lng,
//           }}
//           title="Origin"
//           description={origin.description}
//           identifier="origin"
//         />
//       )}

//       {destination?.location && (
//         <Marker
//           coordinate={{
//             latitude: destination.location.lat,
//             longitude: destination.location.lng,
//           }}
//           title="Destination"
//           description={destination.description}
//           identifier="destination"
//         />
//       )}
//     </MapView>
//   );
// };

// export default Map;




//Try code

// import { StyleSheet, View } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import tw from 'tailwind-react-native-classnames';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
// import MapViewDirections from 'react-native-maps-directions';
// import { GOOGLE_MAPS_APIKEY } from "@env";

// const Map = ({ initialLocation }) => {
//   const origin = useSelector(selectOrigin);
//   const destination = useSelector(selectDestination);
//   const mapRef = useRef(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!origin || !destination) return;

//     const timeout = setTimeout(() => {
//       mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
//         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//       });
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [origin, destination]);

//   useEffect(() => {
//     if (!origin || !destination) return;

//     const getTravelTime = async () => {
//       fetch(
//         `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
//         });
//     };

//     getTravelTime();
//   }, [origin, destination, GOOGLE_MAPS_APIKEY]);

//   return (
//     <MapView
//       ref={mapRef}
//       style={tw`flex-1`}
//       mapType="mutedStandard"
//       initialRegion={
//         initialLocation
//           ? {
//               latitude: initialLocation.latitude,
//               longitude: initialLocation.longitude,
//               latitudeDelta: 0.005,
//               longitudeDelta: 0.005,
//             }
//           : null
//       }
//     >
//       {origin && destination && (
//         <MapViewDirections
//           origin={origin.description}
//           destination={destination.description}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={3}
//           strokeColor='black'
//           onError={(errorMessage) => {
//             console.log("MapViewDirections Error:", errorMessage);
//           }}
//         />
//       )}

//       {origin?.location && (
//         <Marker
//           coordinate={{
//             latitude: origin.location.lat,
//             longitude: origin.location.lng,
//           }}
//           title="Origin"
//           description={origin.description}
//           identifier="origin"
//         />
//       )}

//       {destination?.location && (
//         <Marker
//           coordinate={{
//             latitude: destination.location.lat,
//             longitude: destination.location.lng,
//           }}
//           title="Destination"
//           description={destination.description}
//           identifier="destination"
//         />
//       )}
//     </MapView>
//   );
// };

// export default Map;
