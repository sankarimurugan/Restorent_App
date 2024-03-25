import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {
  bottomicon,
  delivery,
  left,
  leftarrow,
  location,
  pic,
  plate,
  spoon,
  tableicon,
} from '../assets/img';
import {fS} from '../constants/Loader/Loader';
import {F} from '../assets/styles/ColorsFonts';
import EmptyRecervationComp from '../components/Recervation/EmptyRecervationComp';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import TableReservationList from '../components/TableReservation/TableReservationList';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const RecervationScreen = () => {
  const navi = useNavigation();
  const [emptyOrList, setEmptyOrList] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FCFBF4',
        SCREEN_HEIGHT,
        SCREEN_WIDTH,
      }}>
      <ScreenHeaderComp headername={'Table Reservation'} />
      {!emptyOrList && (
        <EmptyRecervationComp setActive={setActive} active={active} />
      )}
      {emptyOrList && (
        <ScrollView
          contentContainerStyle={{paddingBottom: fS(10)}}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20}}>
            <TableReservationList />
          </View>
        </ScrollView>
      )}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={active}
          onRequestClose={() => {
            setActive(false);
            console.warn('close');
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '85%',
                height: '45%',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <View style={{marginBottom: '6%', marginTop: '5%'}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: fS(28),
                    color: '#000',
                  }}>
                  Select your food type
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '85%', marginBottom: '6%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        // navigation.navigate('FoodDeliveryList')
                        navi.navigate('FoodOrderList', {
                          type: 'delivery',
                        })
                      }
                      style={{
                        width: '45%',
                        padding: '16%',
                        backgroundColor: '#FFF',
                        borderRadius: 20,
                        elevation: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{marginBottom: '3%'}}>
                        <Image
                          source={delivery}
                          style={{
                            width: fS(200),
                            height: fS(80),
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: fS(80),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: fS(16),
                            color: '#000',
                          }}>
                          Delivery
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navi.navigate('TableDateTime')}
                      style={{
                        width: '45%',
                        padding: '16%',
                        backgroundColor: '#FFF',
                        borderRadius: 20,
                        elevation: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={tableicon}
                        style={{
                          width: fS(200),
                          height: fS(80),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setActive(!active)}
                  style={{
                    backgroundColor: '#A4A4A4',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 12,
                    width: '45%',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fS(21),
                      color: '#FFF',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default RecervationScreen;

const styles = StyleSheet.create({});
