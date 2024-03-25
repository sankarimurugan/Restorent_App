import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import CompletedOrderList from '../components/Order/CompletedOrderList';
import OutgoingOrderList from '../components/Order/OutgoingOrderList';
import {cartEmpty, emptyOrder} from '../assets/img';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const OrdersScreen = () => {
  const navi = useNavigation();
  const loc = useRoute();
  const [toggleslide, setToggleSlide] = useState(1);
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    const backAction = () => {
      if (loc?.params?.key == 'profile') {
        navi.goBack();
        return true;
      } else {
        navi.navigate('home');
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navi]);
  return (
    <SafeAreaView style={styles.safview}>
      <ScreenHeaderComp headername={'Orders'} type={1} />
      {isEmpty && (
        <View style={styles.topcont}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btns}
            onPress={() => setToggleSlide(1)}>
            <Text
              style={[
                styles.htext,
                toggleslide == 1 ? {color: C.BLACK} : {color: C.LIGHT_GRAY},
              ]}>
              Ongoing
            </Text>
            <View
              style={[
                styles.line,
                toggleslide == 1 && {backgroundColor: C.PRIMARY},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btns}
            onPress={() => setToggleSlide(2)}>
            <Text
              style={[
                styles.htext,
                toggleslide == 2 ? {color: C.BLACK} : {color: C.LIGHT_GRAY},
              ]}>
              Completed
            </Text>
            <View
              style={[
                styles.line,
                toggleslide == 2 && {backgroundColor: C.PRIMARY},
              ]}
            />
          </TouchableOpacity>
        </View>
      )}
      {isEmpty && (
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {toggleslide == 1 && <OutgoingOrderList />}
          {toggleslide == 2 && <CompletedOrderList />}
        </ScrollView>
      )}
      {!isEmpty && (
        <View
          style={{
            SCREEN_HEIGHT,
            SCREEN_WIDTH,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={emptyOrder}
            style={{
              width: fS(250),
              height: fS(250),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text style={styles.bgtxt}>No Order Found</Text>
          <Text style={styles.stxt}>
            Looks like you haven’e made your order yet
          </Text>
          <TouchableOpacity
            style={styles.BBtn}
            onPress={() => navi.navigate('home')}>
            <Text style={styles.BBtxt}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  safview: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: C.PRIMARY_BG,
  },
  topcont: {
    paddingHorizontal: fS(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btns: {
    paddingTop: fS(10),
    paddingBottom: fS(20),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    position: 'relative',
  },
  htext: {
    fontFamily: F.f5,
    fontSize: fS(22),
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: fS(5),
    bottom: 0,
    borderRadius: fS(10),
  },
  bgtxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(25),
  },
  stxt: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(16),
    width: '60%',
    textAlign: 'center',
    lineHeight: fS(26),
    marginTop: fS(20),
  },
  BBtn: {
    width: '90%',
    backgroundColor: C.PRIMARY,
    paddingVertical: fS(17),
    borderRadius: fS(15),
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: fS(40),
  },
  BBtxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
  },
});
