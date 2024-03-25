import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import FormComp from '../components/Help&Support/FormComp';
import BottomComp from '../components/Help&Support/BottomComp';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HelpAndSupportScreen = () => {
  const navi = useNavigation();
  const loc = useRoute();
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
    <SafeAreaView style={styles.safView}>
      <ScreenHeaderComp headername={'Help & Support'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: fS(20)}}
        showsVerticalScrollIndicator={false}>
        <FormComp />
        <View style={styles.bottomcont}>
          <Text style={styles.ortxt}>Or</Text>
        </View>
        <BottomComp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpAndSupportScreen;

const styles = StyleSheet.create({
  safView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: C.PRIMARY_BG,
    flex: 1,
  },
  scroll: {},
  bottomcont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: fS(30),
  },
  ortxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
  },
});
