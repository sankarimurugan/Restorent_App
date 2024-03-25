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
import {
  GreenLocation,
  LocationPin,
  Tracker,
  bikemap,
  locationicon,
  logout,
  restaurantmap,
  trackcheck,
} from '../assets/img';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {MAPS_API_KEY} from '../redux/api/constants';
import Geocoder from 'react-native-geocoding';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import MapViewDirections from 'react-native-maps-directions';
import BootomSheetComp from '../components/TrackOrderComp/BootomSheetComp';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const lineWidth = SCREEN_WIDTH - fS(100);

const TrackOrderScreen = () => {
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
        // setAddressGeometry(json.results[0].geometry.location);
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{height: '100%', width: '100%', position: 'relative'}}>
        <View
          style={{
            flex: 8,
          }}>
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: cLat,
              longitude: cLong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={currentRegion}
            onRegionChangeComplete={onChangeRegion}>
            <Marker
              style={{color: 'pink'}}
              coordinate={{latitude: cLat, longitude: cLong}}
              title={'Marker Title'}
              description={'Marker Description'}></Marker>
            <Marker
              coordinate={{
                latitude: 13.041088147904366,
                longitude: 80.21160190925,
              }}
              title={'Marker Title'}
              description={'Marker Description'}>
              <Image
                source={restaurantmap}
                style={{height: fS(50), width: fS(50)}}
              />
              <View
                style={{
                  height: fS(100),
                  width: fS(100),
                  position: 'relative',
                }}>
                <Image
                  source={bikemap}
                  style={{
                    objectFit: 'contain',
                    height: '100%',
                    width: '100%',
                    transform: [{rotate: '-90deg'}],
                  }}
                />
              </View>
            </Marker>
            <MapViewDirections
              origin={{latitude: cLat, longitude: cLong}}
              destination={{
                latitude: 13.041088147904366,
                longitude: 80.21160190925,
              }}
              apikey={MAPS_API_KEY}
              strokeWidth={5}
              strokeColor="#0A7AFF"
            />
          </MapView>

          <View
            style={{
              marginTop: fS(20),
              width: '100%',
              borderRadius: 10,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <ScreenHeaderComp track={true} headername={'Order Tracking'} />
          </View>
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
                  Please turn on your location to find out better suggestions
                  near you
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
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
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
          <BootomSheetComp
            finalAddress={finalAddress}
            requestLocPermission={requestLocPermission}
            handleMyLocationPress={handleMyLocationPress}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  map: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  tracklineconp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: lineWidth,
    marginVertical: fS(30),
    position: 'relative',
    alignSelf: 'center',
  },
  line: {
    width: lineWidth,
    backgroundColor: C.LINE_GRAY,
    height: fS(3),
    alignSelf: 'center',
  },
  Sline1: {
    width: lineWidth / 3,
    height: fS(3),
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  Sline2: {
    width: lineWidth / 3,
    height: fS(3),
    position: 'absolute',
    backgroundColor: 'green',
    left: lineWidth / 3,
    top: 0,
    bottom: 0,
  },
  Sline3: {
    width: lineWidth / 3,
    height: fS(3),
    position: 'absolute',
    backgroundColor: 'pink',
    left: lineWidth - lineWidth / 3,
    top: 0,
    bottom: 0,
  },
  chekbox1: {
    height: fS(20),
    width: fS(20),
    backgroundColor: 'red',
    borderRadius: fS(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: fS(-10),
  },
  chekbox2: {
    position: 'absolute',
    height: fS(20),
    width: fS(20),
    backgroundColor: 'red',
    borderRadius: fS(30),
    alignItems: 'center',
    justifyContent: 'center',
    left: lineWidth / 3.2,
  },
  chekbox3: {
    position: 'absolute',
    height: fS(20),
    width: fS(20),
    backgroundColor: 'red',
    borderRadius: fS(30),
    alignItems: 'center',
    justifyContent: 'center',
    left: lineWidth - lineWidth / 3,
  },
  chekbox4: {
    position: 'absolute',
    height: fS(20),
    width: fS(20),
    backgroundColor: 'red',
    borderRadius: fS(30),
    alignItems: 'center',
    justifyContent: 'center',
    right: fS(-10),
  },
  icon: {
    objectFit: 'contain',
    height: fS(15),
    width: fS(15),
  },
  Text1: {
    position: 'absolute',
    top: 0,
    marginTop: fS(30),
    left: fS(-40),
  },
  Text2: {
    position: 'absolute',
    top: 0,
    marginTop: fS(30),
    left: lineWidth / 3 - fS(30),
  },
  Text3: {
    position: 'absolute',
    top: 0,
    marginTop: fS(30),
    right: lineWidth / 3 - fS(50),
  },
  Text4: {
    position: 'absolute',
    top: 0,
    marginTop: fS(30),
    right: fS(-30),
  },
  btxt: {
    fontFamily: F.f4,
    fontSize: fS(15),
    color: C.LINE_GREEN,
  },
  ordertxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
  },
  table: {
    width: '100%',
  },
  tablecont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: fS(15),
  },
  rtxt: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(17),
  },
  btxt: {
    fontFamily: F.f5,
    fontSize: fS(17),
    color: C.BLACK,
  },
  botxt: {
    fontFamily: F.f5,
    fontSize: fS(20),
    color: C.BLACK,
  },
});
