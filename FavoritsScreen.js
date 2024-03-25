import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {C} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import FavoritsListComp from '../components/Favorits/FavoritsListComp';
import {product_list} from '../redux/api/DummyJson';
import {cartEmpty, location} from '../assets/img';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const FavoritsScreen = () => {
  const [productList, setProductList] = useState([...product_list]);

  const setLikeFun = ind => {
    const updatedList = [...productList];
    updatedList.splice(ind, 1);
    setProductList(updatedList);
  };
  console.log(productList?.length);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: C.PRIMARY_BG,
        SCREEN_HEIGHT,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <ScreenHeaderComp headername={'Favorites'} />
      <ScrollView
        style={{SCREEN_WIDTH, SCREEN_HEIGHT}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: fS(20),
          backgroundColor: C.PRIMARY_BG,
        }}>
        {productList?.length > 0 && (
          <FavoritsListComp setLikeFun={setLikeFun} productList={productList} />
        )}
      </ScrollView>
      {productList?.length == 0 && (
        <View
          style={{
            SCREEN_HEIGHT,
            SCREEN_WIDTH,
            flex: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={cartEmpty}
            style={{
              width: fS(250),
              height: fS(250),
              resizeMode: 'contain',
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoritsScreen;

const styles = StyleSheet.create({});
