import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');
import {useNavigation, useRoute} from '@react-navigation/native';
import {left, leftarrow, location, pic, plate, spoon} from '../assets/img';
import {fS} from '../constants/Loader/Loader';
import {C, F} from '../assets/styles/ColorsFonts';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import AddressListComp from '../components/address/AddressListComp';
import {address_list} from '../redux/api/DummyJson';
import SavedAddressList from '../components/SavedAddress/SavedAddressList';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const SavedAddressScreen = () => {
  const navi = useNavigation();
  const [address, setAddress] = useState(true);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.PRIMARY_BG}}>
      <ScreenHeaderComp headername={'Saved Address'} />
      <ScrollView
        style={{
          SCREEN_HEIGHT,
          SCREEN_WIDTH,
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {address && <SavedAddressList />}
          {!address && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50%',
              }}>
              <View style={{}}>
                <Image
                  source={location}
                  style={{
                    width: fS(200),
                    height: fS(140),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{marginBottom: '3%', marginTop: '5%'}}>
                <Text
                  style={{
                    fontFamily: F.f5,
                    fontSize: fS(24),
                    color: '#252525',
                  }}>
                  Add Address
                </Text>
              </View>
              <View style={{marginBottom: '3%'}}>
                <Text
                  style={{
                    fontFamily: F.f3,
                    fontSize: fS(17),
                    color: '#252525',
                  }}>
                  No address has been added.
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              navi.navigate('AddAddress', {list: false, type: 'saved'})
            }
            style={{
              backgroundColor: C.PRIMARY,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              padding: 12,
              width: '40%',
              alignSelf: 'center',
              borderRadius: fS(15),
            }}>
            <View>
              <Text
                style={{
                  fontFamily: F.f5,
                  fontSize: fS(18),
                  color: '#252525',
                }}>
                + Add address
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navi.goBack()} style={styles.btn}>
        <Text
          style={{
            fontFamily: F.f5,
            fontSize: fS(18),
            color: '#252525',
          }}>
          Choose
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SavedAddressScreen;

const styles = StyleSheet.create({
  btn: {
    marginVertical: fS(20),
    width: SCREEN_WIDTH / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: fS(20),
    backgroundColor: C.PRIMARY,
    alignSelf: 'center',
    borderRadius: fS(15),
  },
});
