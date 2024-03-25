import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {left, pic, plate, spoon} from '../assets/img';
const {height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navi = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      console.log('login');
      navi.navigate('LoginScreen');
    }, 3000);
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FCFBF4'}}>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '15%',
              height: height / 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
              }}>
              <Image
                source={pic}
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  resizeMode: 'stretch',
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 2.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '70%',
              height: height / 9,
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
          <View style={{marginBottom: 10}}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#000'}}>
              OrderZest
            </Text>
          </View>
          <View style={{}}>
            <Text style={{fontWeight: '500', fontSize: 14, color: '#000'}}>
              “Where Every Meal is a Celebration”
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '30%',
              }}>
              <View
                style={{
                  width: '50%',
                  height: height / 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '87%',
                    marginLeft: 22,
                  }}>
                  <Image
                    source={left}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '35%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: height / 4.8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '97%',
                  }}>
                  <Image
                    source={plate}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
