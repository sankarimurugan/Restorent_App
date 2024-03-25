import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {C, F} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const QRCodeScannerScreen = () => {
  const navi = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [codeColor, setCodeColor] = useState(false);

  const handleQRCodeScanned = ({data}) => {
    setScanned(true);
    Alert.alert(
      'QR Code Scanned!',
      `Scanned QR code data: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false);
            navi.navigate('TableDateTime');
            setCodeColor(true);
          },
        },
      ],
      {cancelable: false},
    );
    // if (data) {
    //   setTimeout(() => {
    //     navi.navigate('home');
    //   }, 2000);
    // }
  };
  return (
    <View style={styles.cont}>
      <QRCodeScanner
        onRead={handleQRCodeScanned}
        reactivate={true}
        reactivateTimeout={5000}
        // flashMode={RNCamera.Constants.FlashMode.auto}
        // containerStyle={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH, flex: 1}}
        cameraStyle={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH, flex: 1}}
      />
      {scanned && <Text>Scanned!</Text>}
      <View style={styles.bt_cont}>
        <Text style={styles.b_text1}>Scan QR to Reserve Table</Text>
        <Text style={styles.b_text2}>
          To reserve your table, simply scan this QR code.
        </Text>
      </View>
      <View style={styles.box_cont}>
        <View style={styles.scaner}>
          <View
            style={[
              styles.line1,
              codeColor ? {borderColor: C.Blue} : {borderColor: C.WHITE},
            ]}
          />
          <View
            style={[
              styles.line2,
              codeColor ? {borderColor: C.Blue} : {borderColor: C.WHITE},
            ]}
          />
          <View
            style={[
              styles.line3,
              codeColor ? {borderColor: C.Blue} : {borderColor: C.WHITE},
            ]}
          />
          <View
            style={[
              styles.line4,
              codeColor ? {borderColor: C.Blue} : {borderColor: C.WHITE},
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default QRCodeScannerScreen;

const styles = StyleSheet.create({
  cont: {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bt_cont: {
    height: 'auto',
    width: SCREEN_WIDTH,
    backgroundColor: C.V_DARK_GRAY,
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: fS(30),
    borderTopStartRadius: fS(30),
    paddingVertical: fS(20),
    paddingHorizontal: fS(20),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  b_text1: {
    fontFamily: F.f5,
    color: C.WHITE,
    fontSize: fS(25),
    textAlign: 'center',
    width: '100%',
    lineHeight: fS(40),
    marginBottom: fS(10),
  },
  b_text2: {
    fontFamily: F.f3,
    color: C.WHITE,
    fontSize: fS(18),
    textAlign: 'center',
    width: '70%',
    lineHeight: fS(30),
  },
  scaner: {
    height: fS(300),
    width: fS(300),
    backgroundColor: 'transparent',
    position: 'relative',
    // borderWidth: fS(1),
    // borderStyle: 'dashed',
  },
  line1: {
    height: fS(75),
    width: fS(75),
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopWidth: fS(5),
    borderLeftWidth: fS(5),
  },
  line2: {
    height: fS(75),
    width: fS(75),
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopWidth: fS(5),
    borderRightWidth: fS(5),
  },
  line3: {
    height: fS(75),
    width: fS(75),
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomWidth: fS(5),
    borderLeftWidth: fS(5),
  },
  line4: {
    height: fS(75),
    width: fS(75),
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomWidth: fS(5),
    borderRightWidth: fS(5),
  },
  box_cont: {
    position: 'absolute',
  },
});
