import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import {C} from '../assets/styles/ColorsFonts';
import CuisinListComp from '../components/Cuisine/CuisinListComp';
import {fS} from '../constants/Loader/Loader';

const CuisinListScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.PRIMARY_BG}}>
      <ScreenHeaderComp headername={'Cuisine Category'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: fS(17)}}
        contentContainerStyle={{
          paddingBottom: fS(20),
          backgroundColor: C.PRIMARY_BG,
        }}>
        <CuisinListComp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CuisinListScreen;

const styles = StyleSheet.create({});
