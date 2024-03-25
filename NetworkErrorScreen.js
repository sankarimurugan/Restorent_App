import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {emptyOrder, networkerr} from '../assets/img';
import {fS} from '../constants/Loader/Loader';
import {C, F} from '../assets/styles/ColorsFonts';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const NetworkErrorScreen = () => {
  return (
    <View style={styles.cont}>
      <Image source={networkerr} style={{height: fS(300), width: fS(300)}} />
      <Text style={styles.toptxt}>Network Error</Text>
      <Text style={styles.paratxt}>
        the connection to the network is impossible. Please check the status of
        your connection or try again in a few minutes
      </Text>
    </View>
  );
};

export default NetworkErrorScreen;

const styles = StyleSheet.create({
  cont: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: fS(30),
  },
  toptxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
    marginVertical: fS(20),
  },
  paratxt: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(17),
    textAlign: 'center',
    lineHeight: fS(27),
  },
});
