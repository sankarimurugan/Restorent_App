import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ImageBackground,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {
  banner,
  delivery,
  food,
  food1,
  hamburger,
  india,
  menu,
  profile,
  scan,
  table,
  tableicon,
} from '../assets/img';
import {fS} from '../constants/Loader/Loader';
import NavBar from '../components/Home/NavBar';
import Drawer from '../components/drawer/Drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width: width, height: height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [active, setActive] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const products = [
    {
      name: ' Chicken Briyani',
      price: '$22.50',
      rating: '4.8',
      review: '256 reviews',
    },
    {
      name: ' Chicken Briyani',
      price: '$30',
      rating: '4.8',
      review: '256 reviews',
    },
    {
      name: ' Chicken Briyani',
      price: '$20',
      rating: '4.8',
      review: '256 reviews',
    },
    {
      name: ' Chicken Briyani',
      price: '$20',
      rating: '4.8',
      review: '256 reviews',
    },
    {
      name: ' Chicken Briyani',
      price: '$20',
      rating: '4.8',
      review: '256 reviews',
    },
    {
      name: ' Chicken Briyani',
      price: '$20',
      rating: '4.8',
      review: '256 reviews',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FCFBF4'}}>
      {showDrawer && <Drawer toggleDrawer={toggleDrawer} />}

      <ScrollView>
        <View
          style={{
            width: '100%',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: '7%',
            }}>
            <View style={{width: '94%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={toggleDrawer}
                  style={styles.menucont}>
                  <Image source={menu} style={styles.menu} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{marginRight: 12}}>
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      color="#000"
                      size={height / 33}
                    />
                  </View>

                  <View style={{}}>
                    <Image
                      source={profile}
                      style={{
                        width: fS(50),
                        height: fS(55),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontWeight: '700', fontSize: 25, color: '#252525'}}>
                  Hi Stella
                </Text>
              </View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontWeight: '500', fontSize: 16, color: '#252525'}}>
                  Where would you like to reserve your table ?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: 10,

                  borderRadius: 15,
                }}>
                <Image
                  source={banner}
                  style={{
                    width: '100%',
                    height: fS(200),
                    resizeMode: 'stretch',
                  }}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontWeight: '700', fontSize: 20, color: '#252525'}}>
                  Bookings
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFDD0',
                  padding: '3%',
                  marginBottom: '5%',
                }}>
                <View style={{width: '65%'}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: fS(19),
                      color: '#252525',
                      lineHeight: 20,
                      textAlign: 'center',
                    }}>
                    I'm sorry, but there are no bookings to display at the
                    moment.
                  </Text>
                </View>
                <View style={{width: '30%'}}>
                  <Image
                    source={table}
                    style={{
                      width: fS(125),
                      height: fS(120),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '7%',
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: fS(22),
                      color: '#252525',
                    }}>
                    Cuisine Category
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: fS(17),
                      color: '#252525',
                    }}>
                    See all (4)
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '5%',
                }}>
                <View style={{width: '48%'}}>
                  <ImageBackground
                    source={food}
                    style={{
                      width: '100%',
                      height: fS(120),
                      resizeMode: 'contain',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: '3%',
                        paddingTop: '4%',
                      }}>
                      <View
                        style={{
                          padding: 2,
                          backgroundColor: '#FFF',
                        }}>
                        <Image
                          source={india}
                          style={{
                            width: fS(20),
                            height: fS(15),
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{marginLeft: 3}}>
                        <Text
                          style={{
                            color: '#FFF',
                            fontSize: fS(16),
                            fontWeight: '700',
                          }}>
                          Indian
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>

                <View style={{width: '48%'}}>
                  <ImageBackground
                    source={food}
                    style={{
                      width: '100%',
                      height: fS(120),
                      resizeMode: 'cover',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: '3%',
                        paddingTop: '4%',
                      }}>
                      <View
                        style={{
                          padding: 2,
                          backgroundColor: '#FFF',
                          borderRadius: 2,
                        }}>
                        <Image
                          source={india}
                          style={{
                            width: fS(20),
                            height: fS(15),
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{marginLeft: 3}}>
                        <Text
                          style={{
                            color: '#FFF',
                            fontSize: fS(16),
                            fontWeight: '700',
                          }}>
                          American
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '5%',
                }}>
                <View style={{width: '55%'}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: fS(17),
                      color: '#252525',
                      textAlign: 'justify',
                      lineHeight: 15,
                    }}>
                    “Life is the biggest party you’ll ever be at”
                  </Text>
                </View>

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
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                                navigation.navigate('FoodDeliveryList')
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
                                  width: fS(60),
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
                              onPress={() =>
                                navigation.navigate('TableDateTime')
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
                <TouchableOpacity
                  onPress={() => setActive(!active)}
                  style={{
                    width: '35%',
                    backgroundColor: '#FFD400',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fS(17),
                      color: '#252525',
                    }}>
                    Select Food
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{marginBottom: '4%'}}>
                <Text
                  style={{fontWeight: '700', fontSize: 20, color: '#252525'}}>
                  Popular Menus
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginBottom: '25%',
                }}>
                {products.map((product, index) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFF',
                      elevation: 5,
                      width: '48%',
                      borderRadius: 20,
                      padding: 6,
                      marginBottom: 15,
                    }}
                    key={index}>
                    <View
                      style={{
                        width: '100%',
                        marginBottom: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={food1}
                        style={{
                          width: '100%',
                          height: fS(150),
                          resizeMode: 'stretch',
                        }}
                      />
                    </View>
                    <View style={{marginBottom: '4%'}}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: fS(20),
                          color: '#252525',
                        }}>
                        Chicken Briyani
                      </Text>
                    </View>
                    <View style={{marginBottom: '4%'}}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: fS(16),
                          color: '#252525',
                        }}>
                        $22.50
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon name="star" color="#FFD400" size={height / 35} />
                      <View style={{marginLeft: 3}}>
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: fS(14),
                            color: '#252525',
                          }}>
                          4.8
                        </Text>
                      </View>

                      <View style={{marginLeft: 3}}>
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: fS(14),
                            color: '#A4A4A4',
                          }}>
                          (256 reviews)
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menucont: {
    height: fS(50),
    width: fS(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});
