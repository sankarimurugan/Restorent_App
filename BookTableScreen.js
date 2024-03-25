import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import TableDateTime from '../components/tablebooking/TableDateTime';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import {fS} from '../constants/Loader/Loader';
import {C, F} from '../assets/styles/ColorsFonts';
import CalendarArrow from '../components/tablebooking/CalendarArrow';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {leftArrowtab, leftarrow, rightArrow, schedule} from '../assets/img';
import CheckinOutComp from '../components/tablebooking/CheckinOutComp';
import MembersComp from '../components/tablebooking/MembersComp';
import {useNavigation} from '@react-navigation/native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const BookTableScreen = () => {
  const initDate = '2023-10-25';
  // const currentHrs = new Date().format('HH');
  // const CurrentMin = moment(new Date()).format('MM');

  // console.log(currentHrs);
  // console.log(CurrentMin);

  const [selected, setSelected] = useState(initDate);

  const [arrows, setArrows] = useState('');
  const navi = useNavigation();
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: '#FFD400',
        selectedTextColor: '#000',
      },
    }),
    [selected],
  );

  console.log('arrows', arrows);

  const CustomHeader = ({direction}) => {
    console.log('direction', direction);
    return (
      <View style={styles.headerContainer}>
        {direction == 'left' && (
          <TouchableOpacity
            style={styles.rightarrowcont}
            onPress={direction.onPressArrowLeft}>
            <Image source={leftArrowtab} style={styles.rightarrow} />
          </TouchableOpacity>
        )}

        {/* <Text>{direction.month}</Text> */}
        {direction == 'right' && (
          <TouchableOpacity
            style={styles.rightarrowcont}
            onPress={direction.onPressArrowRight}>
            <Image source={rightArrow} style={styles.rightarrow} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.contaner}>
      <ScreenHeaderComp headername={'Wingman’s Restaurant'} />
      <ScrollView
        contentContainerStyle={{paddingBottom: fS(20)}}
        showsVerticalScrollIndicator={false}
        style={{
          SCREEN_HEIGHT,
          SCREEN_WIDTH,
          flex: 1,
        }}>
        <View style={styles.calcont}>
          <View style={styles.topcont}>
            <View style={styles.imgcontb}>
              <Image source={schedule} style={styles.boule} />
            </View>
            <Text style={styles.textt}>Choose Reservation Date & Time</Text>
          </View>
          <View style={{marginVertical: fS(20)}}>
            <Calendar
              renderArrow={direction => (
                <View style={styles.arrows}>
                  <CustomHeader direction={direction} />
                </View>
              )}
              initialDate={selected}
              markedDates={marked}
              onDayPress={day => {
                console.log('selected day', day);
                setSelected(day.dateString);
              }}
              style={styles.box_cont}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: C.PRIMARY,
                selectedDayTextColor: '#ffffff',
                todayTextColor: C.PRIMARY,
                dayTextColor: '#2d4150',
                textDisabledColor: C.BLACK,
                dotColor: C.PRIMARY,
                selectedDotColor: '#ffffff',
                arrowColor: C.BLACK,
                monthTextColor: C.BLACK,
                textDayFontFamily: F.f3,
                textDayFontSize: fS(15),
                textMonthFontFamily: F.f5,
                textDayHeaderFontFamily: F.f5,
              }}
            />
          </View>
        </View>
        <CheckinOutComp />
        <View style={[styles.calcont, {paddingHorizontal: fS(20)}]}>
          <View style={styles.topcont2}>
            <View style={styles.imgcontb}>
              <Image source={schedule} style={styles.boule} />
            </View>
            <Text style={styles.textt}>Members</Text>
          </View>

          <MembersComp />
        </View>
      </ScrollView>
      <View style={styles.btncont}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => navi.navigate('home')}>
          <Text style={styles.btntext1}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navi.navigate('charebook')}
          style={styles.btn2}>
          <Text style={styles.btntext2}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookTableScreen;

const styles = StyleSheet.create({
  contaner: {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    backgroundColor: C.PRIMARY_BG,
    flex: 1,
  },
  box_cont: {
    // height: fS(270),
    // width: fS(195),
    backgroundColor: 'red',
    shadowColor: C.BLACK,
    borderRadius: fS(20),
    shadowOpacity: 1,
    shadowRadius: fS(20),
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 6,
    backgroundColor: C.WHITE,
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: fS(8),
    width: SCREEN_WIDTH - fS(30),
  },
  calcont: {
    alignItems: 'center',
  },
  arrowCont: {
    height: fS(10),
    width: fS(10),
  },
  rightarrowcont: {
    height: fS(20),
    width: fS(20),
  },
  rightarrow: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrows: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '10%',
  },
  topcont: {
    width: SCREEN_WIDTH - fS(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: fS(10),
    marginBottom: fS(15),
    paddingHorizontal: fS(10),
  },

  topcont2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: fS(10),
    marginTop: fS(20),
    paddingHorizontal: fS(10),
    marginBottom: fS(10),
  },
  textt: {
    fontFamily: F.f4,
    fontSize: fS(16),
    color: C.BLACK,
  },
  imgcontb: {
    height: fS(28),
    width: fS(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boule: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  btncont: {
    SCREEN_WIDTH,
    height: 'auto',
    backgroundColor: C.PRIMARY_BG,
    paddingVertical: fS(20),
    flexDirection: 'row',
    paddingHorizontal: fS(30),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn1: {
    paddingVertical: fS(17),
    // paddingHorizontal: fS(40),
    backgroundColor: C.DARK_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fS(20),
    width: SCREEN_WIDTH / 2.6,
  },
  btntext1: {
    fontFamily: F.f5,
    color: C.WHITE,
    fontSize: fS(20),
  },
  btn2: {
    paddingVertical: fS(17),
    // paddingHorizontal: fS(40),
    backgroundColor: C.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fS(20),
    width: SCREEN_WIDTH / 2.6,
  },
  btntext2: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(20),
  },
});
