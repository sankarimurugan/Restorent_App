import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {C, F} from '../assets/styles/ColorsFonts';
import {NUMBER, fS} from '../constants/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {spoon, checkbox, uncheckbox} from '../assets/img';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PhoneNumberVerifyScreen = () => {
  const navi = useNavigation();

  let mobileNo = 10;

  const [mobileno, setMobileNo] = useState('');
  const [termsCond, setTermsCond] = useState(false);

  // Error
  const [mobileerr, setMobileerr] = useState(false);

  const onClickHandler = () => {
    setTermsCond(!termsCond);
  };

  const mobileinputhandler = e => {
    setMobileNo(e);
    Keyboard.isVisible();
    if (NUMBER.test(e) == false || e.length < 10) {
      setMobileerr(true);
    } else {
      setMobileerr(false);
      Keyboard.dismiss();
    }
  };

  const onSubmitHandle = () => {
    if (NUMBER.test(mobileno) == false || mobileno.length < 10) {
      setMobileerr(true);
    } else if (!termsCond) {
      // setTermsCond(true);
    } else {
      navi.navigate('otp_screen');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.PRIMARY_BG}}>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: fS(50),
          }}>
          <View
            style={{
              width: '70%',
              height: SCREEN_HEIGHT / 9,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '97%',
              }}>
              <Image
                source={spoon}
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View style={{marginBottom: fS(20)}}>
            <Text style={styles.logoname}>OrderZest</Text>
          </View>
          <View style={{}}>
            <Text style={styles.distext}>
              “Where Every Meal is a Celebration”
            </Text>
          </View>
        </View>
        <View style={styles.formcomp}>
          <Text style={styles.signtext}>Please Enter your Mobile Number</Text>
          <View style={styles.form}>
            <View style={[styles.inputcont, {marginBottom: fS(30)}]}>
              <TextInput
                maxLength={mobileNo}
                placeholder="Enter Mobile Number"
                keyboardType="number-pad"
                placeholderTextColor={C.LIGHT_GRAY}
                autoComplete="off"
                editable={true}
                style={[styles.input]}
                value={mobileno}
                onChangeText={mobileinputhandler}
              />
              {mobileerr && mobileno.length < 10 && (
                <Text style={styles.errorText}>
                  Please Enter Mobile Number *
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: fS(20),
              gap: fS(10),
              width: SCREEN_WIDTH - fS(25),
            }}>
            <Pressable
              onPress={onClickHandler}
              style={{
                width: fS(25),
                height: fS(25),
                // marginRight: fS(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={termsCond ? checkbox : uncheckbox}
                style={styles.chechImg}
              />
            </Pressable>
            <View style={styles.heading}>
              <View style={[styles.headingss]}>
                <Text style={[styles.headingText]}>
                  By Login you are agreeing to our
                </Text>
                <TouchableOpacity>
                  <Text style={styles.headingText1}> Terms of use</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headingss}>
                <Text style={styles.headingText}> and </Text>
                <TouchableOpacity>
                  <Text style={styles.headingText1}>Privacy policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.btncont}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={onSubmitHandle}>
              <Text style={styles.btntxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberVerifyScreen;

const styles = StyleSheet.create({
  safView: {
    // flex: 1,
    SCREEN_WIDTH,
    backgroundColor: C.PRIMARY_BG,
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: fS(100),
  },
  formcomp: {
    // flex: 3,
    width: '100%',
    padding: fS(25),
  },
  container: {
    SCREEN_WIDTH,
  },
  signtext: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(23),
    // marginTop: fS(30),
  },
  form: {
    // marginTop: fS(10),
  },
  errorText: {
    fontFamily: F.f1,
    color: C.RED,
    fontSize: fS(16),
    position: 'absolute',
    bottom: fS(-33),
    right: 0,
  },
  labletext: {
    fontFamily: F.f3,
    color: C.BLACK,
    fontSize: fS(22),
  },
  input: {
    width: '100%',
    height: fS(76),
    backgroundColor: C.WHITE,
    borderRadius: fS(20),
    marginTop: fS(40),
    padding: fS(20),
    fontSize: fS(19),
    fontFamily: F.f2,
    color: C.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: fS(20),
    shadowColor: C.LIGHT_GRAY,
    shadowOffset: {
      height: fS(80),
      width: 0,
    },
    elevation: 5,
  },
  rText: {
    fontFamily: F.f1,
    color: C.RED,
    fontSize: fS(16),
    position: 'absolute',
    bottom: fS(-33),
    right: 0,
  },
  inputcont: {
    position: 'relative',
  },
  forgottxt: {
    fontFamily: F.f3,
    fontSize: fS(23),
    color: C.BLACK,
    textAlign: 'right',
  },
  forgotcont: {
    marginTop: fS(20),
  },
  btncont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: fS(80),
  },
  btn: {
    width: '100%',
    backgroundColor: C.PRIMARY,
    paddingVertical: fS(22),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fS(20),
  },
  btntxt: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(23),
  },
  bcont: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    marginTop: fS(30),
  },
  btext: {
    fontFamily: F.f4,
    fontSize: fS(22),
  },
  heading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headingss: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  headingText: {
    fontFamily: F.f4,
    color: C.BLACK,
    fontSize: fS(17),
  },
  headingText1: {
    fontFamily: F.f5,
    color: C.BLACK,
    fontSize: fS(17),
  },
  chechImg: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    tintColor: C.PRIMARY,
    objectFit: 'contain',
  },
  logoname: {
    fontFamily: F.f6,
    color: C.BLACK,
    fontSize: fS(30),
    // marginVertical: fS(10),
  },
  distext: {
    fontFamily: F.f4,
    color: C.BLACK,
    fontSize: fS(20),
    // marginVertical: fS(15),
  },
});
