import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonHeader from '../components/Header/CommonHeader';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import {detailBanner, detailBanner1, table} from '../assets/img';
import OrderFoodList from '../components/TableReservation/OrderFoodList';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import OrderCancelPoppup from '../components/TableReservation/OrderCancelPoppup';

const {width, height} = Dimensions.get('window');

const TableReservationDetailScreen = ({title}) => {
  const [orderCancel, setOrderCancel] = useState(false);
  const toggle = () => {
    setOrderCancel(!orderCancel);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: C.PRIMARY_BG,
        position: 'relative',
      }}>
      {orderCancel && (
        <OrderCancelPoppup
          toggle={toggle}
          btn1={'Cancel'}
          btn2={'Yes, Sure'}
          mess={'Are you sure want to cancel the reservation'}
        />
      )}
      <ScreenHeaderComp headername={'Main Choice Restaurant'} />
      <ScrollView
        style={{paddingHorizontal: fS(20)}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: fS(30)}}>
        <View style={styles.imgBox}>
          <Image style={styles.bannerImg} source={detailBanner1} />
        </View>
        <Text style={styles.title}>Wingman’s Restaurant</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: fS(6)}}>
          <Image source={table} style={styles.table} />
          <Text style={styles.name}>Reserved Table No : 03</Text>
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.dateTimeText}>
            Reservation Date & Time : 7th Oct - 11:30 AM - 12:30 PM
          </Text>
        </View>
        <OrderFoodList />
      </ScrollView>
      <TouchableOpacity style={styles.cancelBtn} onPress={toggle}>
        <Text style={styles.cancelBtnTxt}>Cancel Reservation</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default TableReservationDetailScreen;
const styles = StyleSheet.create({
  imgBox: {
    width: '100%',
    height: fS(250),
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 15,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  title: {
    fontFamily: F.f5,
    fontSize: fS(19),
    color: C.BLACK,
    marginBottom: fS(10),
  },
  name: {
    fontFamily: F.f5,
    fontSize: fS(16),
    color: C.BLACK,
  },
  table: {
    width: fS(40),
    height: fS(40),
    resizeMode: 'contain',
  },
  schedule: {
    width: fS(22),
    height: fS(22),
    resizeMode: 'contain',
    marginRight: fS(10),
  },
  dateTime: {
    backgroundColor: '#0257DC',
    height: fS(40),
    borderRadius: fS(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: fS(13),
  },
  dateTimeText: {
    fontFamily: F.f4,
    fontSize: fS(14),
    color: C.WHITE,
  },
  cancelBtn: {
    backgroundColor: C.red,
    height: fS(50),
    borderRadius: fS(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: fS(5),
    marginBottom: fS(10),
    width: 200,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  cancelBtnTxt: {
    fontFamily: F.f4,
    fontSize: fS(16),
    color: C.WHITE,
  },
});
