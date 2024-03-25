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
import {fS} from '../constants/Loader/Loader';
import {useNavigation} from '@react-navigation/native';
import {eye_hide, eye_view, spoon} from '../assets/img';
// import {hidden_pass, indiaflag} from '../assets/image';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const NewPasswordScreen = () => {
  const navi = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error
  const [passwordErr, setPasswordErr] = useState(false);
  const [validPassErr, setValidPassErr] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [confirmpassErr, setConfirmPassErr] = useState(false);
  const [confirmpassError, setConfirmPassError] = useState(false);

  const onSubmitHandle = () => {
    if (confirmPassword.length == 0 || password.length == 0) {
      setPasswordError(true);
      setConfirmPassError(true);
      setConfirmPassErr(false);
    } else {
      navi.navigate('LoginScreen');
    }
  };

  const passwordchange = e => {
    setPassword(e);
    Keyboard.isVisible();
    if (password.length < 8) {
      setPasswordErr(true);
      setPasswordError(false);
      setValidPassErr('Password should be at least 8 characters long*');
    } else {
      if (!/\d/.test(e)) {
        setPasswordErr(true);
        setPasswordError(false);

        setValidPassErr('Add at least one number *');
      } else {
        if (!/[A-Z]/.test(e) || !/[a-z]/.test(e)) {
          setPasswordErr(true);
          setPasswordError(false);

          setValidPassErr('Include both upper and lower case letters*');
        } else {
          if (!/[^A-Za-z0-9]/.test(e)) {
            setPasswordErr(true);
            setPasswordError(false);

            setValidPassErr('Include at least one special character*');
          } else {
            setPasswordErr(false);
            setPasswordError(false);
          }
        }
      }
    }
  };

  const onChangeConfirmPass = e => {
    setConfirmPassword(e);
    Keyboard.isVisible();
    if (confirmPassword != password || password.length < 0) {
      setConfirmPassErr(true);
    } else {
      setConfirmPassErr(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.PRIMARY_BG}}>
      <ScrollView
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
          <View style={styles.form}>
            <View style={[styles.inputcont, {marginBottom: fS(35)}]}>
              <Text style={styles.labletext}>New Password</Text>
              <View style={styles.inputpasscont}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Enter the Password"
                  placeholderTextColor={C.LIGHT_GRAY}
                  autoComplete="off"
                  editable={true}
                  style={[styles.input]}
                  onChangeText={passwordchange}
                  value={password}
                />
                <TouchableOpacity
                  style={styles.iconCont}
                  onPress={toggleShowPassword}>
                  <Image
                    style={styles.eye}
                    source={showPassword ? eye_view : eye_hide}
                  />
                </TouchableOpacity>
              </View>
              {passwordError && password.length === 0 && (
                <Text style={styles.errorText}>Please Enter Password *</Text>
              )}
              {passwordErr && (
                <Text style={styles.errorText}>{validPassErr}</Text>
              )}
            </View>
            <View style={[styles.inputcont, {marginBottom: fS(30)}]}>
              <Text style={styles.labletext}>Confirm Password</Text>
              <View style={styles.inputpasscont}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Enter the Password"
                  placeholderTextColor={C.LIGHT_GRAY}
                  autoComplete="off"
                  editable={true}
                  style={[styles.input]}
                  value={confirmPassword}
                  onChangeText={onChangeConfirmPass}
                />
                <TouchableOpacity
                  style={styles.iconCont}
                  onPress={toggleShowConfirmPassword}>
                  <Image
                    style={styles.eye}
                    source={showConfirmPassword ? eye_view : eye_hide}
                  />
                </TouchableOpacity>
              </View>
              {confirmpassErr && password != confirmPassword && (
                <Text style={styles.errorText}>Password don't match *</Text>
              )}
              {confirmpassError && confirmPassword.length == 0 && (
                <Text style={styles.errorText}>
                  Please Enter Confirm Password *
                </Text>
              )}
            </View>
          </View>

          <View style={styles.btncont}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={onSubmitHandle}>
              <Text style={styles.btntxt}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPasswordScreen;

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
  },
  form: {
    // marginTop: fS(10),
  },
  labletext: {
    fontFamily: F.f4,
    color: C.BLACK,
    fontSize: fS(20),
  },
  input: {
    width: '90%',
    height: fS(80),
    fontSize: fS(20),
    fontFamily: F.f2,
    color: C.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: fS(20),
    shadowColor: C.LIGHT_GRAY,
    shadowOffset: {
      height: fS(80),
      width: 0,
    },
  },
  errorText: {
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
    marginTop: fS(40),
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
  inputpasscont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: fS(80),
    backgroundColor: C.WHITE,
    borderRadius: fS(20),
    marginTop: fS(20),
    padding: fS(20),
    fontSize: fS(22),
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
  iconCont: {
    width: fS(37),
    height: fS(37),
  },
  eye: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});
