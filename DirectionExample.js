import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {MAPS_API_KEY} from '../redux/api/constants';

const DirectionsExample = () => {
  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{latitude: 37.78825, longitude: -122.4324}}
        title={'Marker Title'}
        description={'Marker Description'}
      />
      <MapViewDirections
        origin={{latitude: 37.78825, longitude: -122.4324}}
        destination={{latitude: 37.7749, longitude: -122.4194}}
        apikey={MAPS_API_KEY}
        strokeWidth={5}
        strokeColor="#0A7AFF"
      />
    </MapView>
  );
};

export default DirectionsExample;
