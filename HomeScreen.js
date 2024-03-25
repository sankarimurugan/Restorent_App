import {
  Alert,
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {table_img} from '../assets/img';
import HomeHeader from '../components/Home/HomeHeader';
import SidebarComp from '../components/Home/SidebarComp';
import HomeBannerComp from '../components/Home/HomeBannerComp';
import CuisineCategoryComp from '../components/Home/CuisineCategoryComp';
import PopularMenusListComp from '../components/Home/PopularMenusListComp';
import BottomNav from '../components/Home/BottomNav';
import TableDateTime from '../components/tablebooking/TableDateTime';
import OrderCancelPoppup from '../components/TableReservation/OrderCancelPoppup';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const HomeScreen = () => {
  const navi = useNavigation();
  const location = useRoute();
  const tranceX1 = useRef(new Animated.Value(-500)).current;
  const opac = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(false);
  const [logoutpoppup, setLogoutPoppup] = useState(false);

  const toggle = () => {
    setLogoutPoppup(!logoutpoppup);
    setMenuClick(false);
  };

  console.log(location?.name);

  const [menuClick, setMenuClick] = useState(false);

  const tranfun = () => {
    setMenuClick(!menuClick);
  };

  useEffect(() => {
    if (!menuClick) {
      Animated.timing(tranceX1, {
        toValue: -500,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      if (menuClick) {
        Animated.timing(tranceX1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [tranfun]);

  useEffect(() => {
    if (location?.name === 'home') {
      const backAction = () => {
        Alert.alert('Exit App', 'Do you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [navi]);

  return (
    <SafeAreaView style={styles.safView}>
      {/* <HomeHeader menuClick={menuClick} setMenuClick={setMenuClick} /> */}
      {logoutpoppup && (
        <OrderCancelPoppup
          toggle={toggle}
          mess={'Are you sure you want to log out?'}
          btn1={'Cancel'}
          btn2={'Yes, Sure'}
        />
      )}
      <SidebarComp
        tranceX1={tranceX1}
        opac={opac}
        tranfun={tranfun}
        menuClick={menuClick}
        toggle={toggle}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: fS(120)}}>
        <HomeHeader menuClick={menuClick} setMenuClick={setMenuClick} />
        <View style={styles.catcontainer}>
          <Text style={styles.name}>Hi Stella</Text>
          <Text style={styles.bQuest}>
            Where would you like to reserve your table ?
          </Text>
        </View>
        <HomeBannerComp />
        <View style={styles.bookingcont}>
          <Text style={styles.text}>Bookings</Text>
          <View style={styles.boxcont}>
            <Text style={styles.tabletext}>
              I'm sorry, but there are no bookings to display at the moment.
            </Text>
            <View style={styles.tablecont}>
              <Image source={table_img} style={styles.table} />
            </View>
          </View>
        </View>
        <CuisineCategoryComp setActive={setActive} />
        <PopularMenusListComp setActive={setActive} />
        {/* <TableDateTime /> */}
      </ScrollView>
      <BottomNav setActive={setActive} active={active} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safView: {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    position: 'relative',
    backgroundColor: C.PRIMARY_BG,
    flex: 1,
  },
  scroll: {
    width: '100%',
    position: 'relative',
  },
  catcontainer: {
    paddingHorizontal: fS(25),
    justifyContent: 'flex-start',
    gap: fS(10),
  },
  name: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(27),
  },
  bQuest: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(18),
    // marginTop: fS(10),
  },
  text: {
    fontSize: fS(22),
    fontFamily: F.f5,
    color: C.BLACK,
  },
  bookingcont: {
    paddingHorizontal: fS(25),
    marginTop: fS(20),
  },
  boxcont: {
    height: fS(150),
    SCREEN_WIDTH,
    backgroundColor: C.LT_YELLOW,
    borderRadius: 10,
    marginTop: fS(20),
    shadowOpacity: 0.5,
    shadowRadius: 100,
    shadowColor: C.PRIMARY_BG,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: fS(20),
  },
  tabletext: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(19),
    lineHeight: fS(25),
    width: '50%',
  },
  tablecont: {
    height: fS(180),
    width: fS(180),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: fS(20),
  },
  table: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  sidebarlayer: {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    backgroundColor: 'red',
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});
