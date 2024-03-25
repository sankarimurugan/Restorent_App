import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {spoon} from '../assets/img';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const OtpScreen = () => {
  const navi = useNavigation();

  const [enableResend, setEnableResend] = useState(false);
  const [countDown, setCountDown] = useState(58);
  const [otp, setOtp] = useState('');
  const [inputErr, setInputErr] = useState(false);

  // Error state
  const [otpErr, setOtpErr] = useState(false);

  const defaultCountdown = 58;

  const onResendOtp = () => {
    setEnableResend(false);
    setCountDown(defaultCountdown);
    clearInterval(clockCall);
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
  };

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const onSubmitHandle = () => {
    if (otp.length < 4) {
      setOtpErr(true);
    } else {
      setOtpErr(false);
      navi.navigate('new_password');
    }
  };
  const onOtpEnter = code => {
    setOtp(code);
    Keyboard.isVisible();
    if (otp.length < 4) {
      setOtpErr(true);
    } else {
      setOtpErr(false);
    }
    if (code.length >= 4) {
      Keyboard.dismiss();
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
            marginTop: fS(60),
          }}>
          <View
            style={{
              width: '100%',
              height: SCREEN_HEIGHT / 9,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '97%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={spoon}
                style={{
                  flex: 1,
                  width: fS(150),
                  height: fS(150),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.formcomp}>
          <Text style={[styles.signtext, {marginBottom: fS(20)}]}>
            Create Account
          </Text>
          <Text style={styles.signtext}>Verify OTP</Text>
          <View style={styles.form}>
            <Text style={styles.labletext}>
              Enter your OTP sent on your mobile number
            </Text>
          </View>
          <View style={styles.inputcont}>
            <OTPInputView
              onCodeChanged={onOtpEnter}
              pinCount={4}
              style={{width: '100%', height: 50}}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                width: fS(75),
                height: fS(75),
                backgroundColor: C.WHITE,
                shadowColor: C.Gray,
                shadowOffset: {width: -1, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 5,
                zIndex: 1,
                color: C.BLACK,
                fontFamily: F.f2,
                fontSize: fS(30),
                borderColor: C.PRIMARY,
                borderRadius: fS(10),
              }}
            />
            {otpErr && otp.length < 4 && (
              <Text style={styles.errorText}>Please enter your otp *</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={[
                styles.lable1,
                {
                  // opacity: countDown > 0 ? 0.4 : 1,
                  fontFamily: F.f3,
                  fontSize: fS(17),
                },
              ]}>
              {/* {!countDown > 0 && 'Didn’t receive the OTP,'} */}
              Didn’t receive the OTP,
            </Text>
            <TouchableOpacity
              disabled={countDown > 0 ? true : false}
              onPress={onResendOtp}>
              <Text
                style={[
                  styles.lable,
                  {
                    // opacity: countDown > 0 ? 0.4 : 1,
                    color: C.PRIMARY,
                    fontFamily: F.f3,
                    fontSize: fS(17),
                  },
                ]}>
                {' '}
                Resend OTP
              </Text>
            </TouchableOpacity>
            <Text style={[styles.lable, {fontFamily: F.f2}]}>
              {' '}
              {countDown <= 58 && countDown > 0 && ' in '}
              {countDown > 0 && countDown}{' '}
              {countDown <= 58 && countDown > 0 && 'sec'}
            </Text>
          </View>

          <View style={styles.btncont}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={onSubmitHandle}>
              <Text style={styles.btntxt}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

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
    fontSize: fS(30),
  },
  form: {
    marginTop: fS(15),
  },
  labletext: {
    fontFamily: F.f4,
    color: C.BLACK,
    fontSize: fS(20),
  },
  lable: {
    color: C.BLACK,
    fontSize: fS(17),
    marginTop: 10,
  },
  lable1: {
    color: C.BLACK,
    fontSize: fS(19),
    marginTop: 10,
  },
  errorText: {
    fontFamily: F.f1,
    color: C.RED,
    fontSize: fS(16),
    position: 'absolute',
    bottom: fS(-45),
    right: 0,
  },
  inputcont: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: fS(50),
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
    marginTop: fS(40),
  },
  btn: {
    width: '100%',
    backgroundColor: C.PRIMARY,
    paddingVertical: fS(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fS(20),
  },
  btntxt: {
    fontFamily: F.f6,
    color: C.BLACK,
    fontSize: fS(20),
  },
  bcont: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: fS(30),
  },
  btext: {
    fontFamily: F.f3,
    fontSize: fS(22),
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
