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
import {useNavigation} from '@react-navigation/native';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import CompletedOrderList from '../components/Order/CompletedOrderList';
import OutgoingOrderList from '../components/Order/OutgoingOrderList';
import {cartEmpty, emptyOrder, profileboy, shopping_list} from '../assets/img';
import BottomNav from '../components/Home/BottomNav';
import {product_list, profile_list} from '../redux/api/DummyJson';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const ProfileScreen = () => {
  const navi = useNavigation();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const backAction = () => {
      navi.navigate('home');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navi]);
  return (
    <SafeAreaView style={styles.safview}>
      <ScreenHeaderComp headername={'Profile'} />
      <View style={styles.container}>
        <Image source={profileboy} style={styles.img} />
        <View style={styles.textcont}>
          <Text style={styles.txtname}>Rifayudeen A</Text>
          <Text style={styles.txtname2}>Prime User</Text>
          <Text style={styles.txtname2}>Male</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.btncont}>
          <Text style={styles.btntxt2}>Edit</Text>
        </TouchableOpacity>
      </View>
      {profile_list?.map(item => {
        return (
          <View style={styles.listcont}>
            <View style={styles.imgborder}>
              <Image
                source={item?.img}
                style={{width: fS(27), height: fS(27), objectFit: 'contain'}}
              />
            </View>
            <TouchableOpacity
              onPress={() => navi.navigate(item?.navi, {key: 'profile'})}
              activeOpacity={0.7}
              style={styles.listlayers}>
              <Text style={styles.listtxt}>{item?.name}</Text>
              <View
                style={{
                  width: fS(30),
                  height: fS(30),
                  backgroundColor: C.PRIMARY,
                  borderRadius: fS(30),
                  elevation: 2,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
      <BottomNav setActive={setActive} active={active} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safview: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: C.PRIMARY_BG,
  },

  container: {
    width: '90%',
    paddingVertical: fS(10),
    backgroundColor: C.PRIMARY,
    alignSelf: 'center',
    elevation: 4,
    borderRadius: fS(20),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: fS(20),
    padding: fS(20),
    position: 'relative',
    marginBottom: fS(30),
  },
  textcont: {
    marginTop: fS(20),
  },
  img: {
    height: fS(150),
    width: fS(150),
    marginVertical: fS(10),
  },
  txtname: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
  },
  txtname2: {
    fontFamily: F.f5,
    color: C.WHITE,
    fontSize: fS(20),
    lineHeight: fS(30),
    // marginTop: fS(10),
  },
  btncont: {
    position: 'absolute',
    bottom: fS(20),
    right: fS(30),
    backgroundColor: C.WHITE,
    paddingHorizontal: fS(20),
    borderRadius: fS(5),
    elevation: 4,
    paddingVertical: fS(4),
  },
  btntxt2: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(13),
  },
  listcont: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: fS(25),
    alignItems: 'center',
    gap: fS(10),
    marginVertical: fS(15),
  },
  list: {flexDirection: 'row', alignItems: 'center', gap: fS(20)},
  imgborder: {
    height: fS(40),
    width: fS(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.WHITE,
    elevation: 4,
    borderRadius: fS(40),
  },
  listtxt: {
    fontFamily: F.f4,
    color: C.BLACK,
    fontSize: fS(20),
  },
  listlayers: {
    backgroundColor: C.WHITE,
    elevation: 4,
    width: '90%',
    paddingVertical: fS(7),
    borderRadius: fS(20),
    paddingHorizontal: fS(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
