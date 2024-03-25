import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FoodListComp from '../components/FoodList/FoodListComp';
import ScreenHeaderComp from '../components/Header/ScreenHeaderComp';
import {C} from '../assets/styles/ColorsFonts';
import {fS} from '../constants/Loader/Loader';

const FoodListScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: C.PRIMARY_BG}}>
      <ScreenHeaderComp headername={'American'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: fS(20)}}>
        <FoodListComp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodListScreen;

const styles = StyleSheet.create({});
