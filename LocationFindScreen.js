import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {fS} from '../constants/Loader/Loader';
import {C, F} from '../assets/styles/ColorsFonts';
import {GreenLocation, LocationPin, Tracker} from '../assets/img';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {MAPS_API_KEY} from '../redux/api/constants';
import Geocoder from 'react-native-geocoding';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const LocationFindScreen = () => {
  const mapRef = useRef(null);
  const navi = useNavigation();

  const [requestLocPermission, setrequestLocPermission] = useState(false);
  const [cLat, setCLat] = useState(0);
  const [cLong, setCLong] = useState(0);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [addressLocation, setAddressLocation] = useState('');
  const [finalAddress, setFinalAddress] = useState({});
  const [addressComponent, setAddressComponent] = useState(null);

  Geocoder.init(MAPS_API_KEY);

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
  }, []);

  const onMapReady = () => {
    requestLocationPermission();
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'OrderZest App needs access to your Location ' +
            'so you can get current Location.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        setrequestLocPermission(true);
      } else {
        setrequestLocPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressDetail = json.results[0].formatted_address;
        let fullAddress = json?.results[0]?.address_components?.splice(-4);
        setAddressLocation(addressDetail);
        let uselessWordsArray = [];

        uselessWordsArray.push(
          fullAddress[0].long_name,
          fullAddress[1].long_name,
          fullAddress[2].long_name,
          fullAddress[3].long_name,
        );
        let expStr = uselessWordsArray.join('|');
        let temp = addressDetail
          .replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
          .replace(/\s{2,}/g, ' ');

        let complete_address = {
          address: temp.replace(/(^[,\s]+)|([,\s]+$)/g, ''),
          city: fullAddress[0].long_name,
          state: fullAddress[1].long_name,
          country: fullAddress[2].long_name,
          landmark: json.results[0].address_components[1].long_name,
          zip_code: fullAddress[3].long_name,
          latitude: latitude,
          longitude: longitude,
        };
        setFinalAddress(complete_address);
        setAddressComponent(
          json.results[0].address_components[
            json.results[0].address_components.length - 1
          ],
        );
        setAddressGeometry(json.results[0].geometry.location);
      })
      .catch(error => console.warn(error));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(location => {
      console.log(location.coords.latitude, location.coords.longitude);
      setCLat(location.coords.latitude);
      setCLong(location.coords.longitude);
      getAddress(location.coords.latitude, location.coords.longitude);
    });
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setCLong(position?.coords?.longitude);
        setCLat(position?.coords?.latitude);
      },
      error => {
        console.log(error?.code, error?.message);
      },
      {enableHighAccuracy: true, timeout: 150000, maximumAge: 10000},
    );
  };

  // Current Location show
  const onChangeRegion = location => {
    console.log(location);
    console.log(location?.latitude, location?.longitude);
    getAddress(location?.latitude, location?.longitude);
    // setCLat(location?.latitude, location?.latitude);
    // setCLong(location?.latitude, location?.longitude);
  };

  const handleMyLocationPress = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0118834525883411,
          longitudeDelta: 0.0118834525883411,
        });
        setCLat(latitude);
        setCLong(longitude);
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  console.log('addressLocation', addressLocation);
  console.log('finalAddress', finalAddress);
  console.log('addressComponent', addressComponent);

  return (
    <View style={{height: '100%', width: '100%', position: 'relative'}}>
      <View
        style={{
          flex: 8,
        }}>
        <MapView
          initialRegion={{
            latitude: cLat,
            longitude: cLong,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onRegionChangeComplete={onChangeRegion}
          onMapReady={onMapReady}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
          tintColor="#000"
          scrollEnabled={true}
          showsUserLocation={true}
          showsUserLocationButton={true}
          zoomEnabled={true}
          showsMyLocationButton={false}
          region={currentRegion}>
          {currentRegion && (
            <Marker
              style={{width: 40, height: 40}}
              coordinate={{latitude: cLat, longitude: cLong}}
            />
          )}
        </MapView>
        {requestLocPermission && (
          <View
            style={{
              backgroundColor: C.WHITE,
              paddingHorizontal: fS(30),
              marginTop: fS(20),
              width: '95%',
              borderRadius: 10,
              position: 'absolute',
              alignSelf: 'center',
              elevation: 3,
              padding: fS(15),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: fS(15),
              }}>
              <Image
                source={GreenLocation}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: C.PRIMARY,
                  alignSelf: 'center',
                  marginStart: fS(15),
                }}
              />
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: fS(17),
                    fontFamily: F.f4,
                    color: C.PRIMARY,
                  }}>
                  Current Location
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: F.f3,
                    color: '#000',
                    fontSize: fS(15),
                    textAlign: 'left',
                    paddingEnd: fS(20),
                    lineHeight: fS(25),
                  }}>
                  {finalAddress?.address}
                </Text>
              </View>
            </View>
          </View>
        )}
        {!requestLocPermission && (
          <View
            style={{
              height: 'auto',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              zIndex: 11,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: fS(30),
              borderTopRightRadius: fS(30),
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 20,
              backgroundColor: C.PRIMARY_BG,
              elevation: 3,
              shadowColor: C.PRIMARY,
              paddingVertical: fS(20),
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                gap: fS(20),
              }}>
              <Text
                style={{
                  fontFamily: F.f5,
                  fontSize: fS(25),
                  color: C.BLACK,
                }}>
                Welcome to OrderZest
              </Text>
              <Text
                style={{
                  fontFamily: F.f2,
                  fontSize: fS(17),
                  color: C.BLACK,
                  lineHeight: 20,
                  // bottom:0,
                }}>
                Please turn on your location to find out better suggestions near
                you
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => onMapReady()}
                style={{
                  width: '100%',
                  height: fS(70),
                  borderRadius: fS(15),
                  backgroundColor: C.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: fS(10),
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: F.f3,
                      color: C.WHITE,
                      fontSize: fS(20),
                      textAlign: 'center',
                    }}>
                    Turn on location
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {requestLocPermission && (
          <View
            style={{
              height: 'auto',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              zIndex: 11,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: fS(30),
              borderTopRightRadius: fS(30),
              paddingHorizontal: 20,
              paddingBottom: 10,
              marginTop: 20,
              backgroundColor: C.PRIMARY_BG,
              elevation: 3,
              shadowColor: C.PRIMARY,
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: F.f5,
                  fontSize: fS(25),
                  color: C.BLACK,
                }}>
                Choose Location
              </Text>
              <Text
                style={{
                  fontFamily: F.f2,
                  fontSize: fS(17),
                  color: C.BLACK,
                  lineHeight: 20,
                  // bottom:0,
                }}>
                Please turn on your location to find out better suggestions near
                you
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleMyLocationPress()}
                style={{
                  width: '100%',
                  height: fS(70),
                  borderRadius: fS(15),
                  backgroundColor: C.WHITE,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: fS(40),
                  marginBottom: fS(10),
                  borderColor: C.PRIMARY,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Tracker}
                    style={{width: 20, height: 20, tintColor: C.PRIMARY}}
                  />
                  <Text
                    style={{
                      fontFamily: F.f3,
                      color: C.PRIMARY,
                      fontSize: fS(20),
                      textAlign: 'center',
                    }}>
                    Use My Current Location
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => navi.navigate('address', {list: true})}
                style={{
                  width: '100%',
                  height: fS(70),
                  borderRadius: fS(15),
                  backgroundColor: C.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: fS(10),
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: F.f3,
                      color: C.WHITE,
                      fontSize: fS(20),
                      textAlign: 'center',
                    }}>
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocationFindScreen;

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
